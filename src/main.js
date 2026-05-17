import { runValidator } from "./engine/validator.js";
import { createAudioEngine } from "./engine/audioManager.js";
import { SaveLoad } from "./engine/saveLoad.js";
import { createTextMeasurer } from "./engine/textMeasure.js";
import { paginateStepText } from "./engine/textPaginator.js";
import { createTypewriterController } from "./engine/typewriterController.js";

const textEl = document.getElementById("text");
const speakerEl = document.getElementById("speaker");
const textWindow = document.getElementById("text-window");
const choicesEl = document.getElementById("choices");
const stageEl = document.getElementById("stage");
const panelEl = document.getElementById("panel");
const toastEl = document.getElementById("toast");
const backlogEl = document.getElementById("backlog");
const continueMarkEl = document.getElementById("continue-mark");
const settingsEl = document.getElementById("settings");
const speedSelects = {
  text: document.getElementById("setting-speed-text"),
  voice: document.getElementById("setting-speed-voice"),
  document: document.getElementById("setting-speed-document")
};
const fontSelects = {
  text: document.getElementById("setting-font-text"),
  voice: document.getElementById("setting-font-voice"),
  document: document.getElementById("setting-font-document")
};

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
let choiceTimer = null;
let choiceDeadline = 0;
let userDisplaySettings = null;
let textMeasurer = null;
let typewriterController = null;
let resizeObserver = null;
let repaginateTimer = null;
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
  userDisplaySettings = loadDisplaySettings();
  applyDisplaySettingsToDom();
  textMeasurer = createTextMeasurer({ textEl, textWindow, speakerEl, continueMarkEl });
  typewriterController = createTypewriterController({ textEl, getSpeed: typewriterSpeed });
  bindUi();
  installResizeReflow();
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
    textMeasurer?.invalidate();
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
    textMeasurer?.invalidate();
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
  document.getElementById("btn-settings").addEventListener("click", () => {
    panelEl.classList.remove("hidden");
    settingsEl?.scrollIntoView({ block: "nearest" });
  });
  bindDisplaySettingControls();
}

function handleAdvanceAreaClick(event) {
  const target = event.target;
  if (target.closest("button")) return;
  if (target.closest("#panel")) return;
  if (target.closest("#choices") && choicesEl.classList.contains("hidden") === false) return;
  nextStep();
}

function renderError(errors) {
  stopChoiceTimer();
  stopTypewriter();
  textEl.textContent = "シナリオ検証エラー\n\n" + errors.join("\n");
  speakerEl.textContent = "";
  choicesEl.classList.add("hidden");
}

async function goToScene(sceneId, startStep = 0, startPage = 0) {
  stopChoiceTimer();
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
  return paginateStepText(step, step.type, {
    measurer: textMeasurer,
    fallbackConfig: paginationConfig
  });
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
    renderChoiceStep(step);
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


function renderChoiceStep(step) {
  stopChoiceTimer();
  speakerEl.textContent = "";
  textEl.className = "text";
  textEl.textContent = step.prompt || "選択してください。";
  currentFullText = textEl.textContent;
  currentVisibleText = currentFullText;
  isTyping = false;
  choicesEl.classList.remove("hidden");
  stageEl.classList.add("has-choices");

  const choiceButtons = [];
  step.choices.forEach((choice) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "choice-button";
    btn.textContent = choice.label;
    btn.addEventListener("click", async () => {
      stopChoiceTimer();
      await chooseOption(choice);
    });
    choicesEl.appendChild(btn);
    choiceButtons.push(btn);
  });

  if (Number(step.timeLimitMs) > 0) {
    startChoiceTimer(step, choiceButtons);
  }
}

async function chooseOption(choice, labelOverride = "") {
  if (!choice || !choice.next) return;
  if (choice.set) setStateValues(choice.set);
  if (typeof choice.score === "number") state.score += choice.score;
  if (choice.forceEnding) state.ending = choice.forceEnding;
  pushBacklog({ kind: "choice", text: labelOverride || choice.label || "選択", sceneId: scene.id, stepIndex });
  await goToScene(choice.next);
}

function startChoiceTimer(step, buttons) {
  const limit = Number(step.timeLimitMs);
  if (!limit || limit <= 0) return;
  if (!step.timeoutNext && !step.timeoutChoiceLabel) return;

  const timerEl = document.createElement("div");
  timerEl.className = "choice-timer";
  timerEl.setAttribute("aria-live", "polite");
  choicesEl.prepend(timerEl);

  choiceDeadline = Date.now() + limit;
  const tick = async () => {
    const remaining = Math.max(0, choiceDeadline - Date.now());
    timerEl.textContent = `残り ${Math.ceil(remaining / 1000)} 秒`;
    if (remaining <= 0) {
      stopChoiceTimer(false);
      buttons.forEach((button) => { button.disabled = true; });
      const timeoutChoice = (step.choices || []).find((choice) => choice.label === step.timeoutChoiceLabel);
      if (timeoutChoice) {
        await chooseOption(timeoutChoice, step.timeoutBacklogLabel || "時間切れ");
        return;
      }
      if (step.timeoutNext) {
        pushBacklog({ kind: "choice", text: step.timeoutBacklogLabel || "時間切れ", sceneId: scene.id, stepIndex });
        await goToScene(step.timeoutNext);
      }
      return;
    }
    choiceTimer = window.setTimeout(tick, 250);
  };
  tick();
}

function stopChoiceTimer(clearElement = true) {
  if (choiceTimer) {
    window.clearTimeout(choiceTimer);
    choiceTimer = null;
  }
  choiceDeadline = 0;
  if (clearElement) {
    choicesEl.querySelectorAll(".choice-timer").forEach((node) => node.remove());
  }
}

function defaultDisplaySettings() {
  const policy = manifest?.engineUiPolicy || {};
  const defaultSpeedPreset = policy?.typewriter?.defaultPreset || {};
  const defaultFontPreset = policy?.fontSize?.defaultPreset || {};
  return {
    speed: {
      text: defaultSpeedPreset.text || "normal",
      voice: defaultSpeedPreset.voice || "normal",
      document: defaultSpeedPreset.document || "normal"
    },
    font: {
      text: defaultFontPreset.text || "normal",
      voice: defaultFontPreset.voice || "normal",
      document: defaultFontPreset.document || "normal"
    }
  };
}

function displaySettingsStorageKey() {
  return `${manifest?.saveKey || manifest?.gameId || "sound_novel"}_display_settings_v01`;
}

function loadDisplaySettings() {
  const defaults = defaultDisplaySettings();
  try {
    const raw = window.localStorage.getItem(displaySettingsStorageKey());
    if (!raw) return defaults;
    const parsed = JSON.parse(raw);
    return {
      speed: { ...defaults.speed, ...(parsed.speed || {}) },
      font: { ...defaults.font, ...(parsed.font || {}) }
    };
  } catch {
    return defaults;
  }
}

function saveDisplaySettings() {
  try {
    window.localStorage.setItem(displaySettingsStorageKey(), JSON.stringify(userDisplaySettings || defaultDisplaySettings()));
  } catch {
    // Ignore storage failures.
  }
}

function bindDisplaySettingControls() {
  userDisplaySettings = userDisplaySettings || loadDisplaySettings();
  for (const [type, select] of Object.entries(speedSelects)) {
    if (!select) continue;
    select.value = userDisplaySettings.speed[type] || "normal";
    select.addEventListener("change", () => {
      userDisplaySettings.speed[type] = select.value;
      saveDisplaySettings();
      showToast("文字送り速度を変更しました");
    });
  }
  for (const [type, select] of Object.entries(fontSelects)) {
    if (!select) continue;
    select.value = userDisplaySettings.font[type] || "normal";
    select.addEventListener("change", () => {
      userDisplaySettings.font[type] = select.value;
      saveDisplaySettings();
      applyDisplaySettingsToDom();
      scheduleRepagination("font-size");
      showToast("文字サイズを変更しました");
    });
  }
}

function applyDisplaySettingsToDom() {
  const settings = userDisplaySettings || defaultDisplaySettings();
  document.documentElement.dataset.fontText = settings.font.text || "normal";
  document.documentElement.dataset.fontVoice = settings.font.voice || "normal";
  document.documentElement.dataset.fontDocument = settings.font.document || "normal";
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
  const speedPolicy = manifest?.engineUiPolicy?.typewriter || {};
  const presetName = userDisplaySettings?.speed?.[type] || speedPolicy?.defaultPreset?.[type] || "normal";
  const presetSpeeds = speedPolicy?.speedPresetsMsPerChar?.[presetName] || {};
  const legacySpeeds = speedPolicy?.speedsMsPerChar || {};
  if (type === "document") return Number(presetSpeeds.document ?? legacySpeeds.document) || 12;
  if (type === "voice") return Number(presetSpeeds.voice ?? legacySpeeds.voice) || 45;
  if (type === "text") return Number(presetSpeeds.text ?? legacySpeeds.text) || 35;
  return Number(legacySpeeds.title) || 0;
}

function startTypewriter(text, type) {
  stopTypewriter();
  currentFullText = String(text || "");
  currentVisibleText = "";
  textEl.textContent = "";
  if (!typewriterController) {
    currentVisibleText = currentFullText;
    textEl.textContent = currentFullText;
    isTyping = false;
    return;
  }
  typewriterController.start(currentFullText, type, {
    onUpdate: (visible) => {
      currentVisibleText = visible;
      isTyping = typewriterController?.isRunning() || false;
    },
    onDone: () => {
      currentVisibleText = currentFullText;
      isTyping = false;
    }
  });
  isTyping = typewriterController.isRunning();
}

function stopTypewriter() {
  if (typewriterController) {
    typewriterController.stop();
  }
  if (typewriterTimer) {
    window.clearTimeout(typewriterTimer);
    typewriterTimer = null;
  }
  isTyping = false;
}

function revealCurrentPage() {
  if (typewriterController) {
    typewriterController.reveal();
  } else {
    textEl.textContent = currentFullText;
  }
  currentVisibleText = currentFullText;
  isTyping = false;
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


function installResizeReflow() {
  if (resizeObserver || typeof ResizeObserver === "undefined") {
    window.addEventListener("resize", () => scheduleRepagination("window-resize"));
    window.addEventListener("orientationchange", () => scheduleRepagination("orientationchange"));
    return;
  }
  resizeObserver = new ResizeObserver(() => scheduleRepagination("resize-observer"));
  resizeObserver.observe(textWindow);
  resizeObserver.observe(stageEl);
  window.addEventListener("orientationchange", () => scheduleRepagination("orientationchange"));
}

function scheduleRepagination(reason = "") {
  if (!scene) return;
  window.clearTimeout(repaginateTimer);
  repaginateTimer = window.setTimeout(() => {
    const step = scene?.steps?.[stepIndex];
    if (!step || !["text", "document", "voice", "title", "conditionalText"].includes(step.type)) return;
    textMeasurer?.invalidate();
    stopTypewriter();
    const oldPageIndex = pageIndex;
    prepareCurrentStep(step);
    pageIndex = Math.min(oldPageIndex, Math.max(0, pageSegments.length - 1));
    renderCurrentStep();
  }, 120);
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
