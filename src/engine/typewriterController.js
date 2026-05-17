// requestAnimationFrame-based typewriter controller.

export function createTypewriterController({ textEl, getSpeed }) {
  let rafId = 0;
  let fullText = "";
  let chars = [];
  let running = false;
  let startTime = 0;
  let type = "text";
  let onUpdate = () => {};
  let onDone = () => {};

  function start(text, textType, callbacks = {}) {
    stop();
    fullText = String(text ?? "");
    chars = Array.from(fullText);
    type = textType || "text";
    onUpdate = callbacks.onUpdate || (() => {});
    onDone = callbacks.onDone || (() => {});

    const speed = Number(getSpeed?.(type)) || 0;
    if (speed <= 0 || chars.length === 0) {
      textEl.textContent = fullText;
      onUpdate(fullText);
      running = false;
      onDone();
      return;
    }

    running = true;
    startTime = performance.now();
    const frame = (now) => {
      if (!running) return;
      const visibleCount = Math.min(chars.length, Math.floor((now - startTime) / speed) + 1);
      const visible = chars.slice(0, visibleCount).join("");
      textEl.textContent = visible;
      onUpdate(visible);
      if (visibleCount >= chars.length) {
        running = false;
        rafId = 0;
        onDone();
        return;
      }
      rafId = window.requestAnimationFrame(frame);
    };
    rafId = window.requestAnimationFrame(frame);
  }

  function stop() {
    if (rafId) {
      window.cancelAnimationFrame(rafId);
      rafId = 0;
    }
    running = false;
  }

  function reveal() {
    stop();
    textEl.textContent = fullText;
    onUpdate(fullText);
    onDone();
  }

  function isRunning() {
    return running;
  }

  return {
    start,
    stop,
    reveal,
    isRunning
  };
}
