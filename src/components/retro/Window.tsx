import { useEffect, useRef, useState, type ReactNode } from "react";
import { useDesktop } from "@/lib/desktop-store";

interface Props {
  id: string;
  children: ReactNode;
}

export function Window({ id, children }: Props) {
  const { windows, focus, close, minimize, toggleMax, move, activeId } = useDesktop();
  const win = windows.find((w) => w.id === id);
  const dragOffset = useRef<{ dx: number; dy: number } | null>(null);
  const [, forceTick] = useState(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragOffset.current || !win) return;
      move(id, e.clientX - dragOffset.current.dx, Math.max(0, e.clientY - dragOffset.current.dy));
    };
    const onUp = () => {
      dragOffset.current = null;
      forceTick((t) => t + 1);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [id, move, win]);

  if (!win || win.minimized) return null;

  const isActive = activeId === id;
  const isMax = win.maximized;
  const style: React.CSSProperties = isMax
    ? { left: 0, top: 0, width: "100vw", height: "calc(100vh - 48px)" }
    : { left: win.x, top: win.y, width: win.w, height: win.h };

  const onTitleMouseDown = (e: React.MouseEvent) => {
    if (isMax) return;
    focus(id);
    dragOffset.current = { dx: e.clientX - win.x, dy: e.clientY - win.y };
  };

  return (
    <div
      className="absolute pixel-window window-open flex flex-col"
      style={{ ...style, zIndex: win.z, background: "var(--color-window)" }}
      onMouseDown={() => focus(id)}
    >
      <div
        className="flex items-center justify-between px-2 h-8 select-none cursor-move"
        style={{
          background: isActive ? "var(--color-titlebar)" : "var(--color-titlebar-inactive)",
          color: "var(--color-titlebar-fg)",
        }}
        onMouseDown={onTitleMouseDown}
        onDoubleClick={() => toggleMax(id)}
      >
        <div className="flex items-center gap-2 pixel text-[10px]">
          <span className="text-base leading-none">{win.icon}</span>
          <span>{win.title}</span>
        </div>
        <div className="flex gap-1">
          <button
            aria-label="Minimize"
            onClick={(e) => {
              e.stopPropagation();
              minimize(id);
            }}
            className="w-6 h-6 pixel text-[10px] flex items-center justify-center"
            style={{ background: "var(--color-neon-yellow)", color: "#000" }}
          >
            _
          </button>
          <button
            aria-label="Maximize"
            onClick={(e) => {
              e.stopPropagation();
              toggleMax(id);
            }}
            className="w-6 h-6 pixel text-[10px] flex items-center justify-center"
            style={{ background: "var(--color-neon-lime)", color: "#000" }}
          >
            □
          </button>
          <button
            aria-label="Close"
            onClick={(e) => {
              e.stopPropagation();
              close(id);
            }}
            className="w-6 h-6 pixel text-[10px] flex items-center justify-center"
            style={{ background: "var(--color-neon-magenta)", color: "#000" }}
          >
            ×
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto pixel-scroll p-4">{children}</div>
    </div>
  );
}
