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

const bgClasses = [
  "bg-black_rain",
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
  textWindow.addEventListener("click", nextStep);
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
    state = structuredClone(scenario.stateDefaults);
    backlog = [];
    panelEl.classList.add("hidden");
    await goToScene(scenario.startScene);
  });
  document.getElementById("btn-save").addEventListener("click", () => {
    saveLoad.save({ state, sceneId: scene.id, stepIndex, backlog });
    showToast("保存しました");
  });
  document.getElementById("btn-load").addEventListener("click", async () => {
    const data = saveLoad.load();
    if (!data) {
      showToast("保存データがありません");
      return;
    }
    state = data.state;
    backlog = data.backlog || [];
    await goToScene(data.sceneId, data.stepIndex || 0);
    showToast("読み込みました");
  });
  document.getElementById("btn-sound").addEventListener("click", async () => {
    soundEnabled = !soundEnabled;
    await audio.setEnabled(soundEnabled);
    applyAmbience();
    showToast(soundEnabled ? "音をオンにしました" : "音をオフにしました");
  });
}

function renderError(errors) {
  textEl.textContent = "シナリオ検証エラー\n\n" + errors.join("\n");
  speakerEl.textContent = "";
  choicesEl.classList.add("hidden");
}

async function goToScene(sceneId, startStep = 0) {
  scene = scenario.scenes.find((item) => item.id === sceneId);
  if (!scene) {
    renderError([`Scene not found: ${sceneId}`]);
    return;
  }
  stepIndex = startStep;
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

function renderCurrentStep() {
  choicesEl.innerHTML = "";
  choicesEl.classList.add("hidden");
  const step = scene.steps[stepIndex];
  if (!step) return;

  if (step.se && soundEnabled) audio.playSe(step.se);

  if (step.type === "text" || step.type === "document" || step.type === "voice" || step.type === "title") {
    speakerEl.textContent = step.type === "title" ? "" : "";
    textEl.className = "text";
    if (step.type === "document") textEl.classList.add("document-text");
    if (step.type === "voice") textEl.classList.add("voice-text");
    if (step.type === "title") textEl.innerHTML = `<div class="ending-title">${escapeHtml(step.text)}</div>`;
    else textEl.textContent = step.text;

    if (step.type !== "title") backlog.push(step.text);
    return;
  }

  if (step.type === "choice") {
    speakerEl.textContent = "";
    textEl.textContent = step.prompt || "選択してください。";
    choicesEl.classList.remove("hidden");
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
    choicesEl.classList.remove("hidden");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "choice-button";
    btn.textContent = "最初から";
    btn.addEventListener("click", async () => {
      state = structuredClone(scenario.stateDefaults);
      backlog = [];
      await goToScene(scenario.startScene);
    });
    choicesEl.appendChild(btn);
  }
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
  stepIndex += 1;
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
