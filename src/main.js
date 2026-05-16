import { runValidator } from "./engine/validator.js";
import { createAudioEngine } from "./engine/audioManager.js";
import { SaveLoad } from "./engine/saveLoad.js";

const textEl = document.getElementById("text");
const speakerEl = document.getElementById("speaker");
const textWindow = document.getElementById("text-window");
const choicesEl = document.getElementById("choices");
const stageEl = document.getElementById("stage");
const panelEl = document.getElementById("panel");
const toastEl = document.getElementById("toast");
const backlogEl = document.getElementById("backlog");

const audio = createAudioEngine();
const saveLoad = new SaveLoad("kaeshisuzu_save_v01");

let scenario = null;
let scene = null;
let stepIndex = 0;
let state = {};
let backlog = [];
let soundEnabled = false;
let pageSegments = [];
let pageIndex = 0;
let isTyping = false;
let typewriterTimer = null;
let currentFullText = "";
let currentVisibleText = "";
let currentStepLoggedKey = "";

const bgClasses = [
  "bg-black_rain",
  "bg-black_plain",
  "bg-old_house_evening",
  "bg-butsuma_night",
  "bg-mountain_path",
  "bg-shrine_night",
  "bg-shrine_dawn",
  "bg-old_house_morning",
  "bg-butsuma_morning"
];

async function init() {
  const response = await fetch("content/scenario/main.json");
  scenario = await response.json();
  const validation = runValidator(scenario);
  if (!validation.ok) {
    renderError(validation.errors);
    return;
  }
  state = structuredClone(scenario.stateDefaults);
  bindUi();
  await goToScene(scenario.startScene);
}

function bindUi() {
  stageEl.addEventListener("click", handleAdvanceAreaClick);
  textWindow.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      nextStep();
    }
  });
  document.getElementById("btn-menu").addEventListener("click", () => panelEl.classList.remove("hidden"));
  document.getElementById("btn-close-panel").addEventListener("click", () => panelEl.classList.add("hidden"));
  document.getElementById("btn-backlog").addEventListener("click", () => {
    backlogEl.classList.toggle("hidden");
    backlogEl.textContent = backlog.join("\n\n---\n\n");
  });
  document.getElementById("btn-restart").addEventListener("click", async () => {
    stopTypewriter();
    state = structuredClone(scenario.stateDefaults);
    backlog = [];
    currentStepLoggedKey = "";
    panelEl.classList.add("hidden");
    await goToScene(scenario.startScene);
  });
  document.getElementById("btn-save").addEventListener("click", () => {
    saveLoad.save({ state, sceneId: scene.id, stepIndex, backlog, pageIndex, currentStepLoggedKey });
    showToast("保存しました");
  });
  document.getElementById("btn-load").addEventListener("click", async () => {
    const data = saveLoad.load();
    if (!data) {
      showToast("保存データがありません");
      return;
    }
    stopTypewriter();
    state = data.state;
    backlog = data.backlog || [];
    currentStepLoggedKey = "";
    await goToScene(data.sceneId, data.stepIndex || 0, data.pageIndex || 0);
    showToast("読み込みました");
  });
  document.getElementById("btn-sound").addEventListener("click", async () => {
    soundEnabled = !soundEnabled;
    await audio.setEnabled(soundEnabled);
    applyAmbience();
    showToast(soundEnabled ? "音をオンにしました" : "音をオフにしました");
  });
}

function handleAdvanceAreaClick(event) {
  const target = event.target;
  if (target.closest("button")) return;
  if (target.closest("#panel")) return;
  if (target.closest("#choices") && choicesEl.classList.contains("hidden") === false) return;
  nextStep();
}

function renderError(errors) {
  stopTypewriter();
  textEl.textContent = "シナリオ検証エラー\n\n" + errors.join("\n");
  speakerEl.textContent = "";
  choicesEl.classList.add("hidden");
}

async function goToScene(sceneId, startStep = 0, startPage = 0) {
  stopTypewriter();
  scene = scenario.scenes.find((item) => item.id === sceneId);
  if (!scene) {
    renderError([`Scene not found: ${sceneId}`]);
    return;
  }
  stepIndex = startStep;
  pageIndex = startPage;
  setBackground(scene.background);
  applyAmbience();
  renderCurrentStep();
}

function setBackground(background) {
  for (const c of bgClasses) stageEl.classList.remove(c);
  stageEl.classList.add(`bg-${background || "black_rain"}`);
}

function applyAmbience() {
  if (!soundEnabled) return;
  audio.setAmbience(scene?.ambience || "silent");
}

function paginateText(text, type) {
  if (!text || type === "title") return [text || ""];
  const cfg = paginationConfig(type);
  const paragraphs = String(text).split("\n\n");
  const pages = [];
  let currentLines = [];

  for (const para of paragraphs) {
    const wrapped = wrapParagraph(para, cfg.charsPerLine);
    const blankCost = currentLines.length > 0 ? 1 : 0;

    if (currentLines.length > 0 && currentLines.length + blankCost + wrapped.length > cfg.maxLines) {
      pages.push(currentLines.join("\n").trimEnd());
      currentLines = [];
    }

    if (wrapped.length > cfg.maxLines) {
      if (currentLines.length > 0) {
        pages.push(currentLines.join("\n").trimEnd());
        currentLines = [];
      }
      for (let i = 0; i < wrapped.length; i += cfg.maxLines) {
        pages.push(wrapped.slice(i, i + cfg.maxLines).join("\n").trimEnd());
      }
      continue;
    }

    if (currentLines.length > 0) currentLines.push("");
    currentLines.push(...wrapped);
  }

  if (currentLines.length > 0) pages.push(currentLines.join("\n").trimEnd());
  return pages.length ? pages : [text];
}

function paginationConfig(type) {
  if (type === "document") return { charsPerLine: 18, maxLines: 12 };
  if (type === "voice") return { charsPerLine: 20, maxLines: 7 };
  return { charsPerLine: 20, maxLines: 10 };
}

function wrapParagraph(paragraph, charsPerLine) {
  const result = [];
  const explicitLines = String(paragraph).split("\n");
  for (const line of explicitLines) {
    const wrapped = wrapLineStrict(line, charsPerLine);
    result.push(...wrapped);
  }
  return result;
}

function wrapLineStrict(line, charsPerLine) {
  if (line.length <= charsPerLine) return [line];

  const chunks = splitForJapaneseLineWrap(line);
  const result = [];
  let current = "";

  for (const chunk of chunks) {
    const pieces = hardSplitByLength(chunk, charsPerLine);
    for (const piece of pieces) {
      if (!current) {
        current = piece;
      } else if ((current + piece).length <= charsPerLine) {
        current += piece;
      } else {
        result.push(current);
        current = piece;
      }
    }
  }

  if (current) result.push(current);
  return result;
}

function hardSplitByLength(text, charsPerLine) {
  const chars = Array.from(String(text));
  const result = [];
  for (let i = 0; i < chars.length; i += charsPerLine) {
    result.push(chars.slice(i, i + charsPerLine).join(""));
  }
  return result;
}

function splitForJapaneseLineWrap(line) {
  const result = [];
  let buffer = "";
  for (const ch of String(line)) {
    buffer += ch;
    if ("。！？』」".includes(ch)) {
      result.push(buffer);
      buffer = "";
    }
  }
  if (buffer.length > 0) result.push(buffer);
  return result.length ? result : [line];
}

function prepareCurrentStep(step) {
  if (["text", "document", "voice", "title"].includes(step.type)) {
    pageSegments = paginateText(step.text, step.type);
    if (pageIndex >= pageSegments.length) pageIndex = 0;
  } else {
    pageSegments = [];
    pageIndex = 0;
  }
}

function renderCurrentStep() {
  stopTypewriter();
  choicesEl.innerHTML = "";
  choicesEl.classList.add("hidden");
  stageEl.classList.remove("has-choices");
  const step = scene.steps[stepIndex];
  if (!step) return;

  prepareCurrentStep(step);
  if (step.se && soundEnabled && pageIndex === 0) audio.playSe(step.se);

  if (step.type === "text" || step.type === "document" || step.type === "voice" || step.type === "title") {
    speakerEl.textContent = "";
    textEl.className = "text";
    if (step.type === "document") textEl.classList.add("document-text");
    if (step.type === "voice") textEl.classList.add("voice-text");
    currentFullText = pageSegments[pageIndex] || "";

    if (step.type === "title") {
      textEl.innerHTML = `<div class="ending-title">${escapeHtml(currentFullText)}</div>`;
      isTyping = false;
    } else {
      startTypewriter(currentFullText, step.type);
      logStepOnce(step);
    }
    return;
  }

  if (step.type === "choice") {
    speakerEl.textContent = "";
    textEl.className = "text";
    textEl.textContent = step.prompt || "選択してください。";
    currentFullText = textEl.textContent;
    currentVisibleText = currentFullText;
    isTyping = false;
    choicesEl.classList.remove("hidden");
    stageEl.classList.add("has-choices");
    step.choices.forEach((choice) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "choice-button";
      btn.textContent = choice.label;
      btn.addEventListener("click", async () => {
        if (choice.set) Object.assign(state, choice.set);
        if (typeof choice.score === "number") state.score += choice.score;
        if (choice.forceEnding) state.ending = choice.forceEnding;
        backlog.push(`【選択】${choice.label}`);
        await goToScene(choice.next);
      });
      choicesEl.appendChild(btn);
    });
    return;
  }

  if (step.type === "jump") {
    goToScene(step.next);
    return;
  }

  if (step.type === "endingCheck") {
    const next = decideEnding();
    goToScene(next);
    return;
  }

  if (step.type === "ending") {
    state.ending = step.ending;
    speakerEl.textContent = "";
    textEl.innerHTML = `<div class="ending-title">${escapeHtml(step.title)}</div><div class="ending-subtitle">${escapeHtml(step.subtitle)}</div>`;
    currentFullText = `${step.title}\n${step.subtitle}`;
    currentVisibleText = currentFullText;
    isTyping = false;
    choicesEl.classList.remove("hidden");
    stageEl.classList.add("has-choices");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "choice-button";
    btn.textContent = "最初から";
    btn.addEventListener("click", async () => {
      stopTypewriter();
      state = structuredClone(scenario.stateDefaults);
      backlog = [];
      currentStepLoggedKey = "";
      await goToScene(scenario.startScene);
    });
    choicesEl.appendChild(btn);
  }
}

function logStepOnce(step) {
  const key = `${scene.id}:${stepIndex}`;
  if (currentStepLoggedKey === key) return;
  currentStepLoggedKey = key;
  if (!step.text) return;
  if (backlog[backlog.length - 1] === step.text) return;
  backlog.push(step.text);
}

function typewriterSpeed(type) {
  if (type === "document") return 12;
  if (type === "voice") return 45;
  if (type === "text") return 35;
  return 0;
}

function startTypewriter(text, type) {
  stopTypewriter();
  const speed = typewriterSpeed(type);
  currentVisibleText = "";
  textEl.textContent = "";
  if (speed <= 0 || !text) {
    currentVisibleText = text || "";
    textEl.textContent = currentVisibleText;
    isTyping = false;
    return;
  }

  const chars = Array.from(text);
  let index = 0;
  isTyping = true;

  const tick = () => {
    if (!isTyping) return;
    const chunkSize = type === "document" ? 2 : 1;
    for (let i = 0; i < chunkSize && index < chars.length; i += 1) {
      currentVisibleText += chars[index];
      index += 1;
    }
    textEl.textContent = currentVisibleText;
    if (index >= chars.length) {
      isTyping = false;
      typewriterTimer = null;
      return;
    }
    typewriterTimer = window.setTimeout(tick, speed);
  };

  tick();
}

function stopTypewriter() {
  if (typewriterTimer) {
    window.clearTimeout(typewriterTimer);
    typewriterTimer = null;
  }
  isTyping = false;
}

function revealCurrentPage() {
  stopTypewriter();
  currentVisibleText = currentFullText;
  textEl.textContent = currentFullText;
}

function decideEnding() {
  if (state.voice_action === "voice_answer" || state.ending === "ending_bad") return "ending_bad";
  if (state.score >= 2) return "ending_true";
  if (state.score >= 0) return "ending_normal";
  return "ending_bad";
}

function nextStep() {
  if (!scene) return;
  const step = scene.steps[stepIndex];
  if (!step || step.type === "choice" || step.type === "ending") return;

  if (isTyping) {
    revealCurrentPage();
    return;
  }

  if (["text", "document", "voice", "title"].includes(step.type)) {
    if (pageIndex < pageSegments.length - 1) {
      pageIndex += 1;
      renderCurrentStep();
      return;
    }
  }

  stepIndex += 1;
  pageIndex = 0;
  if (stepIndex >= scene.steps.length) return;
  renderCurrentStep();
}

function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.remove("hidden");
  setTimeout(() => toastEl.classList.add("hidden"), 1400);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[ch]));
}

init().catch((error) => {
  renderError([error.message]);
});
