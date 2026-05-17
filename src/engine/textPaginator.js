import {
  normalizeInlineCommands,
  splitManualPages,
  safeSplitIndex,
  mergePunctuationOnlyPages
} from "./japaneseLayoutRules.js";

export function paginateStepText(step, type, options = {}) {
  if (!step) return [""];
  if (type === "title") {
    const titleSource = Array.isArray(step.pages) && step.pages.length > 0 ? step.pages.join("\n") : step.text;
    return [normalizeInlineCommands(titleSource || "")];
  }

  const chunks = [];
  if (Array.isArray(step.pages) && step.pages.length > 0) {
    for (const page of step.pages) {
      chunks.push(...splitManualPages(String(page)));
    }
  } else {
    chunks.push(...splitManualPages(String(step.text || "")));
  }

  const pages = [];
  for (const chunk of chunks) {
    const normalized = normalizeInlineCommands(chunk);
    const measured = paginateMeasured(normalized, type, options);
    pages.push(...measured);
  }

  return mergePunctuationOnlyPages(pages.filter((page) => page !== null && page !== undefined))
    .map((page) => String(page).trimEnd())
    .filter((page, index, arr) => page.length > 0 || arr.length === 1);
}

function paginateMeasured(text, type, options) {
  const value = String(text ?? "");
  if (!value) return [""];
  const measurer = options.measurer;

  if (!measurer || typeof measurer.canFit !== "function") {
    return fallbackPaginateText(value, type, options);
  }

  const wholeFit = measurer.canFit(value, type);
  if (wholeFit === true) return [value];
  if (wholeFit === null) return fallbackPaginateText(value, type, options);

  const chars = Array.from(value);
  const pages = [];
  let rest = chars;

  while (rest.length > 0) {
    const maxFit = findMaxFit(rest, type, measurer);
    if (maxFit >= rest.length) {
      pages.push(rest.join(""));
      break;
    }

    const split = Math.max(1, safeSplitIndex(rest, Math.max(1, maxFit)));
    pages.push(rest.slice(0, split).join(""));
    rest = rest.slice(split);
  }

  return pages.length ? pages : [value];
}

function findMaxFit(chars, type, measurer) {
  let low = 1;
  let high = chars.length;
  let best = 0;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const candidate = chars.slice(0, mid).join("");
    const fit = measurer.canFit(candidate, type);
    if (fit === null) {
      return Math.min(chars.length, fallbackCharBudget(type, {}));
    }
    if (fit) {
      best = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return Math.max(1, best);
}

export function fallbackPaginateText(text, type, options = {}) {
  const cfg = fallbackConfig(type, options);
  const paragraphs = String(text ?? "").split("\n\n");
  const pages = [];
  let currentLines = [];

  for (const para of paragraphs) {
    const wrapped = wrapParagraphFallback(para, cfg.charsPerLine);
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
  return mergePunctuationOnlyPages(pages.length ? pages : [String(text ?? "")]);
}

function fallbackCharBudget(type, options = {}) {
  const cfg = fallbackConfig(type, options);
  return Math.max(1, cfg.charsPerLine * cfg.maxLines);
}

function fallbackConfig(type, options = {}) {
  if (typeof options.fallbackConfig === "function") {
    return options.fallbackConfig(type);
  }
  if (type === "document") return { charsPerLine: 18, maxLines: 12 };
  if (type === "voice") return { charsPerLine: 20, maxLines: 7 };
  return { charsPerLine: 20, maxLines: 10 };
}

function wrapParagraphFallback(paragraph, charsPerLine) {
  const result = [];
  const explicitLines = String(paragraph).split("\n");
  for (const line of explicitLines) {
    const chars = Array.from(line);
    while (chars.length > charsPerLine) {
      const split = safeSplitIndex(chars, charsPerLine);
      result.push(chars.slice(0, split).join(""));
      chars.splice(0, split);
    }
    result.push(chars.join(""));
  }
  return result;
}
