// DOM-based text measurement for sound novel pagination.
// The measurer intentionally mirrors the runtime text CSS as closely as possible.

export function createTextMeasurer({ textEl, textWindow, speakerEl, continueMarkEl }) {
  let measureEl = null;
  let lastSignature = "";

  function ensureMeasureEl() {
    if (measureEl) return measureEl;
    measureEl = document.createElement("div");
    measureEl.setAttribute("aria-hidden", "true");
    measureEl.className = "text measurement-text";
    measureEl.style.position = "fixed";
    measureEl.style.left = "-10000px";
    measureEl.style.top = "0";
    measureEl.style.visibility = "hidden";
    measureEl.style.pointerEvents = "none";
    measureEl.style.whiteSpace = "pre-wrap";
    measureEl.style.overflow = "hidden";
    measureEl.style.zIndex = "-1";
    document.body.appendChild(measureEl);
    return measureEl;
  }

  function classNameForType(type) {
    const classes = ["text", "measurement-text"];
    if (type === "voice") classes.push("voice-text");
    if (type === "document") classes.push("document-text");
    return classes.join(" ");
  }

  function readingBox() {
    const textRect = textEl.getBoundingClientRect();
    const windowRect = textWindow.getBoundingClientRect();
    const style = window.getComputedStyle(textWindow);
    const paddingLeft = Number.parseFloat(style.paddingLeft) || 0;
    const paddingRight = Number.parseFloat(style.paddingRight) || 0;
    const paddingTop = Number.parseFloat(style.paddingTop) || 0;
    const paddingBottom = Number.parseFloat(style.paddingBottom) || 0;
    const speakerHeight = speakerEl ? speakerEl.getBoundingClientRect().height : 0;
    const continueHeight = continueMarkEl ? continueMarkEl.getBoundingClientRect().height : 0;

    const width = Math.max(1, textRect.width || (windowRect.width - paddingLeft - paddingRight));
    const clientHeight = textWindow.clientHeight || windowRect.height;
    const height = Math.max(
      1,
      (clientHeight - paddingTop - paddingBottom - speakerHeight - continueHeight)
    );
    return { width, height, clientHeight };
  }

  function signature(type) {
    const box = readingBox();
    const rootDataset = JSON.stringify(document.documentElement.dataset || {});
    return `${type}:${Math.round(box.width)}x${Math.round(box.height)}:${rootDataset}`;
  }

  function canFit(text, type) {
    const box = readingBox();
    if (box.width <= 1 || box.height <= 1) return null;

    const el = ensureMeasureEl();
    el.className = classNameForType(type);
    el.style.width = `${box.width}px`;
    el.style.maxWidth = `${box.width}px`;
    el.style.height = "auto";
    el.style.maxHeight = "none";
    el.textContent = String(text ?? "");

    // scrollHeight reflects the real wrapped block height.
    return el.scrollHeight <= box.height + 1;
  }

  function invalidate() {
    lastSignature = "";
  }

  function hasChanged(type) {
    const sig = signature(type);
    const changed = sig !== lastSignature;
    lastSignature = sig;
    return changed;
  }

  function destroy() {
    if (measureEl) {
      measureEl.remove();
      measureEl = null;
    }
  }

  return {
    canFit,
    invalidate,
    hasChanged,
    readingBox,
    destroy
  };
}
