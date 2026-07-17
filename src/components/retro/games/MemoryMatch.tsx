import { useEffect, useMemo, useState } from "react";
import { retroSfx } from "@/lib/retro-sound";

const ICONS = ["⚛️", "🐍", "📊", "💾", "🎮", "⚡", "🚀", "🖥️"];

interface Card {
  id: number;
  icon: string;
  matched: boolean;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function newDeck(): Card[] {
  return shuffle([...ICONS, ...ICONS]).map((icon, i) => ({ id: i, icon, matched: false }));
}

export function MemoryGame() {
  const [deck, setDeck] = useState<Card[]>(() => newDeck());
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [best, setBest] = useState<number | null>(null);

  useEffect(() => {
    const b = localStorage.getItem("memory-best");
    if (b) setBest(Number(b));
  }, []);

  useEffect(() => {
    if (flipped.length !== 2) return;
    const [a, b] = flipped;
    const t = setTimeout(() => {
      setDeck((d) => {
        if (d[a].icon === d[b].icon) {
          retroSfx.memoryMatch();
          return d.map((c, i) => (i === a || i === b ? { ...c, matched: true } : c));
        }
        retroSfx.memoryMiss();
        return d;
      });
      setFlipped([]);
    }, 700);
    return () => clearTimeout(t);
  }, [flipped]);

  const won = useMemo(() => deck.every((c) => c.matched), [deck]);

  useEffect(() => {
    if (won) {
      retroSfx.memoryWin();
      const b = Number(localStorage.getItem("memory-best") ?? Infinity);
      if (moves < b) {
        localStorage.setItem("memory-best", String(moves));
        setBest(moves);
      }
    }
  }, [won, moves]);

  const flip = (i: number) => {
    if (flipped.length === 2 || flipped.includes(i) || deck[i].matched) return;
    retroSfx.memoryFlip();
    setFlipped((f) => {
      const next = [...f, i];
      if (next.length === 2) setMoves((m) => m + 1);
      return next;
    });
  };

  const reset = () => {
    setDeck(newDeck());
    setFlipped([]);
    setMoves(0);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex justify-between w-full pixel text-[10px]">
        <span className="text-[var(--color-neon-lime)]">MOVES: {moves}</span>
        <span className="text-[var(--color-neon-yellow)]">
          BEST: {best ?? "—"}
        </span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {deck.map((c, i) => {
          const shown = c.matched || flipped.includes(i);
          return (
            <button
              key={c.id}
              onClick={() => flip(i)}
              className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-3xl transition-transform"
              style={{
                background: shown ? "var(--color-neon-cyan)" : "var(--color-titlebar)",
                boxShadow: shown
                  ? "inset 2px 2px 0 #fff, inset -2px -2px 0 #000"
                  : "inset 2px 2px 0 oklch(0.75 0.20 335), inset -2px -2px 0 oklch(0.25 0.15 320)",
                opacity: c.matched ? 0.55 : 1,
              }}
            >
              {shown ? c.icon : "?"}
            </button>
          );
        })}
      </div>
      {won && (
        <div className="pixel text-xs text-[var(--color-neon-lime)]">🏆 YOU WIN!</div>
      )}
      <button className="pixel-btn pixel-btn-accent" onClick={reset}>
        NEW GAME
      </button>
    </div>
  );
}
