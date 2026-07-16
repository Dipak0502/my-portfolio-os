import { useEffect, useState } from "react";

interface Props {
  onDone: () => void;
}

const LINES = [
  "DeepakOS BIOS v1.0",
  "Copyright (c) 2026 Deepak Paswan",
  "",
  "Detecting recruiter... OK",
  "Loading skill_tree.dat... OK",
  "Mounting /projects... OK",
  "Initializing retro-desktop... OK",
  "Booting DeepakOS...",
];

export function BootScreen({ onDone }: Props) {
  const [n, setN] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (n >= LINES.length) {
      const t = setTimeout(() => setDone(true), 400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setN((v) => v + 1), 220);
    return () => clearTimeout(t);
  }, [n]);

  useEffect(() => {
    if (done) {
      const t = setTimeout(onDone, 300);
      return () => clearTimeout(t);
    }
  }, [done, onDone]);

  return (
    <div className="fixed inset-0 z-[10000] bg-black text-[var(--color-neon-lime)] p-6 font-body">
      <div className="max-w-2xl mx-auto pixel text-[10px] leading-loose">
        {LINES.slice(0, n).map((l, i) => (
          <div key={i}>{l || "\u00A0"}</div>
        ))}
        {n < LINES.length && <span className="boot-cursor">█</span>}
        <div className="mt-6">
          <button
            onClick={onDone}
            className="pixel-btn text-[9px] opacity-70 hover:opacity-100"
          >
            [ SKIP ]
          </button>
        </div>
      </div>
    </div>
  );
}
