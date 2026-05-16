export function createAudioEngine() {
  let enabled = false;
  let context = null;
  let rainNode = null;
  let rainGain = null;
  let currentAmbienceAudio = null;
  let audioAssets = { ambiences: {}, se: {} };

  function configure(assets) {
    audioAssets = {
      ambiences: assets?.ambiences || {},
      se: assets?.se || {}
    };
  }

  async function ensureContext() {
    if (!context) {
      context = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (context.state === "suspended") await context.resume();
  }

  async function setEnabled(value) {
    enabled = value;
    if (enabled) await ensureContext();
    if (!enabled) {
      stopRain();
      stopFileAmbience();
    }
  }

  function setAmbience(kind) {
    if (!enabled || !context) return;

    const asset = audioAssets?.ambiences?.[kind];
    if (asset?.src) {
      startFileAmbience(asset);
      return;
    }

    stopFileAmbience();
    if (kind && kind.startsWith("rain")) startRain(kind);
    else stopRain();
  }

  function startFileAmbience(asset) {
    stopRain();
    stopFileAmbience();

    const audio = new Audio(asset.src);
    audio.loop = asset.loop !== false;
    audio.volume = Number.isFinite(Number(asset.volume)) ? Number(asset.volume) : 0.4;
    currentAmbienceAudio = audio;
    audio.play().catch(() => {
      // Live browser checks must confirm file audio playback and autoplay policy.
    });
  }

  function stopFileAmbience() {
    if (currentAmbienceAudio) {
      try {
        currentAmbienceAudio.pause();
        currentAmbienceAudio.currentTime = 0;
      } catch {}
      currentAmbienceAudio = null;
    }
  }

  function startRain(kind) {
    stopRain();
    const bufferSize = context.sampleRate * 2;
    const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.18;
    }
    rainNode = context.createBufferSource();
    rainNode.buffer = buffer;
    rainNode.loop = true;
    rainGain = context.createGain();
    const volume = kind === "rain_heavy" ? 0.10 : kind === "rain_medium" ? 0.06 : kind === "rain_fade" ? 0.025 : 0.04;
    rainGain.gain.value = volume;
    rainNode.connect(rainGain).connect(context.destination);
    rainNode.start();
  }

  function stopRain() {
    if (rainNode) {
      try { rainNode.stop(); } catch {}
      rainNode.disconnect();
      rainNode = null;
    }
    if (rainGain) {
      rainGain.disconnect();
      rainGain = null;
    }
  }

  function playSe(kind) {
    if (!enabled || !context) return;

    const asset = audioAssets?.se?.[kind];
    if (asset?.src) {
      const audio = new Audio(asset.src);
      audio.volume = Number.isFinite(Number(asset.volume)) ? Number(asset.volume) : 0.6;
      audio.play().catch(() => {
        // Live browser checks must confirm file audio playback.
      });
      return;
    }

    if (kind.includes("bell")) playBell(kind === "bell_close" ? 880 : 660);
    if (kind.includes("footstep")) playThump();
  }

  function playBell(freq) {
    const now = context.currentTime;
    const osc = context.createOscillator();
    const gain = context.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.12, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.1);
    osc.connect(gain).connect(context.destination);
    osc.start(now);
    osc.stop(now + 1.15);
  }

  function playThump() {
    const now = context.currentTime;
    const osc = context.createOscillator();
    const gain = context.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(90, now);
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    osc.connect(gain).connect(context.destination);
    osc.start(now);
    osc.stop(now + 0.2);
  }

  return { configure, setEnabled, setAmbience, playSe };
}
