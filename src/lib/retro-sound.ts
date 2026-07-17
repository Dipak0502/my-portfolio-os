// Tiny 8-bit style SFX via Web Audio — no assets required.
let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function blip(freqs: number[], duration = 0.08, type: OscillatorType = "square", volume = 0.08) {
  const ac = getCtx();
  if (!ac) return;
  const now = ac.currentTime;
  const gain = ac.createGain();
  gain.gain.setValueAtTime(volume, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  gain.connect(ac.destination);

  const step = duration / freqs.length;
  freqs.forEach((f, i) => {
    const osc = ac.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(f, now + i * step);
    osc.connect(gain);
    osc.start(now + i * step);
    osc.stop(now + (i + 1) * step + 0.01);
  });
}

export const retroSfx = {
  open: () => blip([440, 660, 880], 0.12),
  close: () => blip([660, 440, 220], 0.12),
  minimize: () => blip([520, 260], 0.09),
  click: () => blip([880], 0.04, "square", 0.05),
};
