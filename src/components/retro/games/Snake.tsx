import { useEffect, useRef, useState } from "react";

const SIZE = 20;
const CELL = 18;

type Point = { x: number; y: number };
const rand = () => ({ x: Math.floor(Math.random() * SIZE), y: Math.floor(Math.random() * SIZE) });

export function SnakeGame() {
  const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
  const [dir, setDir] = useState<Point>({ x: 1, y: 0 });
  const [food, setFood] = useState<Point>(rand());
  const [score, setScore] = useState(0);
  const [alive, setAlive] = useState(true);
  const [running, setRunning] = useState(false);
  const [best, setBest] = useState(0);
  const dirRef = useRef(dir);
  dirRef.current = dir;

  useEffect(() => {
    setBest(Number(localStorage.getItem("snake-best") ?? 0));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const d = dirRef.current;
      if (e.key === "ArrowUp" && d.y !== 1) setDir({ x: 0, y: -1 });
      if (e.key === "ArrowDown" && d.y !== -1) setDir({ x: 0, y: 1 });
      if (e.key === "ArrowLeft" && d.x !== 1) setDir({ x: -1, y: 0 });
      if (e.key === "ArrowRight" && d.x !== -1) setDir({ x: 1, y: 0 });
      if (e.key === " ") setRunning((r) => !r);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!running || !alive) return;
    const t = setInterval(() => {
      setSnake((s) => {
        const head = { x: s[0].x + dirRef.current.x, y: s[0].y + dirRef.current.y };
        if (
          head.x < 0 ||
          head.y < 0 ||
          head.x >= SIZE ||
          head.y >= SIZE ||
          s.some((p) => p.x === head.x && p.y === head.y)
        ) {
          setAlive(false);
          setRunning(false);
          setScore((sc) => {
            const b = Math.max(sc, Number(localStorage.getItem("snake-best") ?? 0));
            localStorage.setItem("snake-best", String(b));
            setBest(b);
            return sc;
          });
          return s;
        }
        const ate = head.x === food.x && head.y === food.y;
        if (ate) {
          setFood(rand());
          setScore((sc) => sc + 1);
          return [head, ...s];
        }
        return [head, ...s.slice(0, -1)];
      });
    }, 110);
    return () => clearInterval(t);
  }, [running, alive, food]);

  const reset = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDir({ x: 1, y: 0 });
    setFood(rand());
    setScore(0);
    setAlive(true);
    setRunning(true);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex justify-between w-full pixel text-[10px]">
        <span className="text-[var(--color-neon-lime)]">SCORE: {score}</span>
        <span className="text-[var(--color-neon-yellow)]">BEST: {best}</span>
      </div>
      <div
        className="relative"
        style={{
          width: SIZE * CELL,
          height: SIZE * CELL,
          background: "#000",
          boxShadow: "inset 2px 2px 0 var(--color-neon-cyan), inset -2px -2px 0 #444",
        }}
      >
        {snake.map((p, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: p.x * CELL,
              top: p.y * CELL,
              width: CELL,
              height: CELL,
              background: i === 0 ? "var(--color-neon-lime)" : "var(--color-neon-cyan)",
              boxShadow: "inset -2px -2px 0 rgba(0,0,0,0.4)",
            }}
          />
        ))}
        <div
          className="absolute"
          style={{
            left: food.x * CELL,
            top: food.y * CELL,
            width: CELL,
            height: CELL,
            background: "var(--color-neon-magenta)",
            boxShadow: "0 0 8px var(--color-neon-magenta)",
          }}
        />
        {!alive && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 pixel text-xs text-[var(--color-neon-magenta)]">
            GAME OVER
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <button className="pixel-btn pixel-btn-accent" onClick={running ? () => setRunning(false) : alive ? () => setRunning(true) : reset}>
          {running ? "PAUSE" : alive ? "START" : "RESTART"}
        </button>
        <button className="pixel-btn" onClick={reset}>RESET</button>
      </div>
      <p className="pixel text-[8px] opacity-70 text-center">
        ARROWS TO MOVE · SPACE TO PAUSE
      </p>
      <div className="grid grid-cols-3 gap-1 md:hidden">
        <div />
        <button className="pixel-btn" onClick={() => dirRef.current.y !== 1 && setDir({ x: 0, y: -1 })}>▲</button>
        <div />
        <button className="pixel-btn" onClick={() => dirRef.current.x !== 1 && setDir({ x: -1, y: 0 })}>◀</button>
        <button className="pixel-btn" onClick={() => dirRef.current.y !== -1 && setDir({ x: 0, y: 1 })}>▼</button>
        <button className="pixel-btn" onClick={() => dirRef.current.x !== -1 && setDir({ x: 1, y: 0 })}>▶</button>
      </div>
    </div>
  );
}
