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
let saveLoad = null;

let manifest = {};
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
let currentBackgroundClass = "";
let routeStepCounter = 0;
const MAX_ROUTE_STEPS = 500;



async function init() {
  manifest = await loadManifest();
  initializeContentPackRuntime();
  const response = await fetch("content/scenario/main.json");
  scenario = await response.json();
  const validation = runValidator(scenario);
  if (!validation.ok) {
    renderError(validation.errors);
    return;
  }
  state = structuredClone(scenario.stateDefaults);
  routeStepCounter = 0;
  bindUi();
  await goToScene(scenario.startScene);
}


function ensureSaveLoad() {
  if (!saveLoad) {
    const saveKey = manifest?.saveKey || manifest?.gameId || "novel_game_save_v01";
    saveLoad = new SaveLoad(saveKey);
  }
  return saveLoad;
}

function initializeContentPackRuntime() {
  audio.configure(manifest?.audio || {});
  const saveKey = manifest?.saveKey || manifest?.gameId || "novel_game_save_v01";
  saveLoad = new SaveLoad(saveKey);
  if (manifest?.title) {
    document.title = manifest.title;
  }
}


async function loadManifest() {
  try {
    const response = await fetch("content/manifest.json");
    return await response.json();
  } catch {
    return {};
  }
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
    backlogEl.textContent = formatBacklog(backlog);
  });
  document.getElementById("btn-restart").addEventListener("click", async () => {
    stopTypewriter();
    state = structuredClone(scenario.stateDefaults);
    routeStepCounter = 0;
    backlog = [];
    currentStepLoggedKey = "";
    panelEl.classList.add("hidden");
    await goToScene(scenario.startScene);
  });
  document.getElementById("btn-save").addEventListener("click", () => {
    ensureSaveLoad().save({ state, sceneId: scene.id, stepIndex, backlog, pageIndex, currentStepLoggedKey });
    showToast("保存しました");
  });
  document.getElementById("btn-load").addEventListener("click", async () => {
    const data = ensureSaveLoad().load();
    if (!data) {
      showToast("保存データがありません");
      return;
    }
    stopTypewriter();
    state = data.state;
    routeStepCounter = 0;
    backlog = normalizeBacklog(data.backlog || []);
    currentStepLoggedKey = data.currentStepLoggedKey || "";
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
  routeStepCounter += 1;
  if (routeStepCounter > MAX_ROUTE_STEPS) {
    renderError([`Route guard stopped possible infinite loop near scene: ${sceneId}`]);
    return;
  }

  scene = scenario.scenes.find((item) => item.id === sceneId);
  if (!scene) {
    renderError([`Scene not found: ${sceneId}`]);
    return;
  }

  incrementVisited(sceneId);

  if (scene.requires && !evaluateCondition(scene.requires)) {
    renderError([`Scene requires failed: ${sceneId}`]);
    return;
  }

  stepIndex = startStep;
  pageIndex = startPage;
  setBackground(scene.background);
  applyAmbience();
  renderCurrentStep();
}

function incrementVisited(sceneId) {
  if (!state.visited || typeof state.visited !== "object") state.visited = {};
  state.visited[sceneId] = Number(state.visited[sceneId] || 0) + 1;
}


function setBackground(background) {
  const backgroundId = background || "black_rain";
  if (currentBackgroundClass) {
    stageEl.classList.remove(currentBackgroundClass);
    currentBackgroundClass = "";
  }
  stageEl.style.backgroundImage = "";
  stageEl.style.backgroundSize = "";
  stageEl.style.backgroundPosition = "";
  stageEl.style.backgroundRepeat = "";

  const spec = manifest?.backgrounds?.[backgroundId];

  if (spec?.kind === "image" && spec.src) {
    stageEl.style.backgroundImage = `linear-gradient(180deg, rgba(18,12,10,0.48), rgba(5,4,4,0.66)), url("${spec.src}")`;
    stageEl.style.backgroundSize = "cover";
    stageEl.style.backgroundPosition = "center center";
    stageEl.style.backgroundRepeat = "no-repeat";
    return;
  }

  const className = spec?.className || `bg-${backgroundId}`;
  stageEl.classList.add(className);
  currentBackgroundClass = className;
}

function applyAmbience() {
  if (!soundEnabled) return;
  audio.setAmbience(scene?.ambience || "silent");
}

function preparePagesForStep(step) {
  if (Array.isArray(step.pages) && step.pages.length > 0) {
    return step.pages.map((page) => normalizeInlineCommands(String(page)));
  }

  const rawText = String(step.text || "");
  const manualChunks = splitByManualPageBreak(rawText);
  const pages = [];
  for (const chunk of manualChunks) {
    const normalized = normalizeInlineCommands(chunk);
    pages.push(...paginateText(normalized, step.type));
  }
  return pages.length ? pages : [normalizeInlineCommands(rawText)];
}

function splitByManualPageBreak(text) {
  return String(text).split("[p]");
}

function normalizeInlineCommands(text) {
  return String(text)
    .replaceAll("[r]", "\n")
    .replaceAll("[p]", "\n");
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
  const profile = manifest?.engineUiPolicy?.paginationProfile || {};
  if (type === "document") return withPaginationDefaults(profile.document, { charsPerLine: 18, maxLines: 12 });
  if (type === "voice") return withPaginationDefaults(profile.voice, { charsPerLine: 20, maxLines: 7 });
  return withPaginationDefaults(profile.text, { charsPerLine: 20, maxLines: 10 });
}

function withPaginationDefaults(value, fallback) {
  if (!value || typeof value !== "object") return fallback;
  return {
    charsPerLine: Number(value.charsPerLine) || fallback.charsPerLine,
    maxLines: Number(value.maxLines) || fallback.maxLines
  };
}

function wrapParagraph(paragraph, charsPerLine) {
  const result = [];
  const explicitLines = String(paragraph).split("\n");
  for (const line of explicitLines) {
    const wrapped = wrapLineKinsoku(line, charsPerLine);
    result.push(...wrapped);
  }
  return result;
}

function wrapLineKinsoku(line, charsPerLine) {
  const chars = Array.from(String(line));
  if (chars.length <= charsPerLine) return [line];

  const lines = [];
  let current = "";

  for (const ch of chars) {
    if (current.length === 0) {
      current = ch;
      continue;
    }

    if ((current + ch).length <= charsPerLine) {
      current += ch;
      continue;
    }

    if (isNoLineStartChar(ch)) {
      current += ch;
      lines.push(current);
      current = "";
      continue;
    }

    lines.push(current);
    current = ch;
  }

  if (current.length > 0) lines.push(current);
  return mergePunctuationOnlyLines(lines);
}

function isNoLineStartChar(ch) {
  return "、。，．,.！？!?」』）】〕〉》".includes(ch);
}

function mergePunctuationOnlyLines(lines) {
  const result = [];
  for (const line of lines) {
    if (isPunctuationOnly(line) && result.length > 0) {
      result[result.length - 1] += line;
    } else {
      result.push(line);
    }
  }
  return result;
}

function isPunctuationOnly(text) {
  return Array.from(String(text)).every((ch) => isNoLineStartChar(ch));
}

function prepareCurrentStep(step) {
  if (["text", "document", "voice", "title", "conditionalText"].includes(step.type)) {
    pageSegments = preparePagesForStep(step);
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

  if (step.type === "conditionalText") {
    const selected = selectConditionalTextCase(step);
    if (!selected) {
      stepIndex += 1;
      pageIndex = 0;
      renderCurrentStep();
      return;
    }
    const virtualStep = {
      type: selected.type || "text",
      text: selected.text,
      pages: selected.pages,
      se: selected.se || step.se
    };
    if (virtualStep.se && soundEnabled && pageIndex === 0) audio.playSe(virtualStep.se);
    speakerEl.textContent = "";
    textEl.className = "text";
    if (virtualStep.type === "document") textEl.classList.add("document-text");
    if (virtualStep.type === "voice") textEl.classList.add("voice-text");
    pageSegments = preparePagesForStep(virtualStep);
    currentFullText = pageSegments[pageIndex] || "";
    startTypewriter(currentFullText, virtualStep.type);
    logStepOnce({ ...virtualStep, type: "conditionalText" });
    return;
  }

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
        if (choice.set) setStateValues(choice.set);
        if (typeof choice.score === "number") state.score += choice.score;
        if (choice.forceEnding) state.ending = choice.forceEnding;
        pushBacklog({ kind: "choice", text: choice.label, sceneId: scene.id, stepIndex });
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

  if (step.type === "pageBreak") {
    stepIndex += 1;
    pageIndex = 0;
    renderCurrentStep();
    return;
  }

  if (step.type === "endingCheck") {
    const next = decideEnding(step);
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

function selectConditionalTextCase(step) {
  for (const item of step.cases || []) {
    if (item.default === true || evaluateCondition(item.if || item.when || item.condition)) {
      if (item.set) setStateValues(item.set);
      return item;
    }
  }
  if (step.fallbackText || step.fallbackPages) {
    return { text: step.fallbackText, pages: step.fallbackPages };
  }
  return null;
}

function logStepOnce(step) {
  const key = `${scene.id}:${stepIndex}`;
  if (currentStepLoggedKey === key) return;
  currentStepLoggedKey = key;
  if (!step.text && !step.pages) return;
  const rawText = Array.isArray(step.pages) ? step.pages.join("\n\n---\n\n") : step.text;
  pushBacklog({ kind: step.type, text: normalizeInlineCommands(rawText), sceneId: scene.id, stepIndex });
}

function pushBacklog(entry) {
  const normalized = typeof entry === "string" ? { kind: "text", text: entry } : entry;
  if (!normalized || !normalized.text) return;
  const last = backlog[backlog.length - 1];
  if (typeof last === "string" && last === normalized.text) return;
  if (last && typeof last === "object" && last.text === normalized.text && last.kind === normalized.kind) return;
  backlog.push(normalized);
}

function normalizeBacklog(items) {
  return items.map((item) => {
    if (typeof item === "string") return { kind: "text", text: item };
    return item;
  });
}

function formatBacklog(items) {
  return normalizeBacklog(items).map((item) => {
    const label = item.kind === "choice" ? "選択" :
      item.kind === "document" ? "文書" :
      item.kind === "voice" ? "声" : "本文";
    return `【${label}】\n${item.text}`;
  }).join("\n\n---\n\n");
}

function typewriterSpeed(type) {
  const speeds = manifest?.engineUiPolicy?.typewriter?.speedsMsPerChar || {};
  if (type === "document") return Number(speeds.document) || 12;
  if (type === "voice") return Number(speeds.voice) || 45;
  if (type === "text") return Number(speeds.text) || 35;
  return Number(speeds.title) || 0;
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

function setStateValues(data) {
  for (const [key, value] of Object.entries(data || {})) {
    const parts = String(key).split(".");
    let current = state;
    for (const part of parts.slice(0, -1)) {
      if (!current[part] || typeof current[part] !== "object") current[part] = {};
      current = current[part];
    }
    current[parts[parts.length - 1]] = value;
  }
}

function decideEnding(step = {}) {
  if (Array.isArray(step.rules) && step.rules.length > 0) {
    for (const rule of step.rules) {
      if (rule.default === true || evaluateCondition(rule.if || rule.when || rule.condition)) {
        if (rule.set) setStateValues(rule.set);
        if (rule.ending) state.ending = rule.ending;
        if (rule.next) return rule.next;
      }
    }
    if (step.fallback) return step.fallback;
  }

  // Legacy fallback for older content packs.
  if (state.voice_action === "voice_answer" || state.ending === "ending_bad") return "ending_bad";
  if (state.score >= 2) return "ending_true";
  if (state.score >= 0) return "ending_normal";
  return "ending_bad";
}

function evaluateCondition(condition) {
  if (!condition) return false;
  if (condition.all) return condition.all.every((item) => evaluateCondition(item));
  if (condition.any) return condition.any.some((item) => evaluateCondition(item));
  if (condition.not) return !evaluateCondition(condition.not);

  const key = condition.flag || condition.key || condition.state;
  if (!key) return false;

  const actual = getStateValue(key);

  if ("equals" in condition) return actual === condition.equals;
  if ("notEquals" in condition) return actual !== condition.notEquals;
  if ("exists" in condition) return condition.exists ? actual !== undefined : actual === undefined;
  if ("in" in condition) return Array.isArray(condition.in) && condition.in.includes(actual);
  if ("notIn" in condition) return Array.isArray(condition.notIn) && !condition.notIn.includes(actual);
  if ("gte" in condition) return Number(actual) >= Number(condition.gte);
  if ("gt" in condition) return Number(actual) > Number(condition.gt);
  if ("lte" in condition) return Number(actual) <= Number(condition.lte);
  if ("lt" in condition) return Number(actual) < Number(condition.lt);
  if ("truthy" in condition) return Boolean(actual) === Boolean(condition.truthy);
  return false;
}

function getStateValue(path) {
  return String(path).split(".").reduce((current, part) => {
    if (current == null) return undefined;
    return current[part];
  }, state);
}


function nextStep() {
  if (!scene) return;
  const step = scene.steps[stepIndex];
  if (!step || step.type === "choice" || step.type === "ending") return;

  if (isTyping) {
    revealCurrentPage();
    return;
  }

  if (["text", "document", "voice", "title", "conditionalText"].includes(step.type)) {
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
