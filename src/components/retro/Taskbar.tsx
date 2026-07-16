import { useEffect, useState } from "react";
import { useDesktop } from "@/lib/desktop-store";
import { APPS } from "./apps/registry";

export function Taskbar() {
  const { windows, open, focus, minimize, activeId } = useDesktop();
  const [now, setNow] = useState(new Date());
  const [startOpen, setStartOpen] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      {startOpen && (
        <div
          className="fixed bottom-12 left-1 pixel-window p-2 z-[1000] w-64"
          style={{ background: "var(--color-window)" }}
        >
          <div className="pixel text-[10px] mb-2 pb-2 border-b border-[var(--color-neon-cyan)]">
            DeepakOS · Menu
          </div>
          <div className="grid gap-1">
            {APPS.map((a) => (
              <button
                key={a.id}
                onClick={() => {
                  open({ id: a.id, title: a.title, icon: a.icon, w: a.w, h: a.h });
                  setStartOpen(false);
                }}
                className="flex items-center gap-2 px-2 py-1 hover:bg-[var(--color-titlebar)] text-left"
              >
                <span className="text-lg">{a.icon}</span>
                <span className="text-[16px]">{a.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div
        className="fixed bottom-0 left-0 right-0 h-12 flex items-center gap-1 px-1 z-[999]"
        style={{
          background: "var(--color-taskbar)",
          boxShadow: "inset 0 2px 0 var(--color-neon-cyan)",
        }}
      >
        <button
          onClick={() => setStartOpen((v) => !v)}
          className="pixel-btn pixel-btn-accent flex items-center gap-1"
        >
          <span>★</span> START
        </button>
        <div className="flex-1 flex gap-1 overflow-x-auto">
          {windows.map((w) => (
            <button
              key={w.id}
              onClick={() => (w.minimized || activeId !== w.id ? focus(w.id) : minimize(w.id))}
              className="pixel-btn text-left truncate max-w-[180px]"
              style={{
                background:
                  activeId === w.id && !w.minimized
                    ? "var(--color-titlebar)"
                    : "var(--color-titlebar-inactive)",
              }}
            >
              {w.icon} {w.title}
            </button>
          ))}
        </div>
        <div className="pixel text-[10px] px-3 py-1 border-l border-[var(--color-neon-cyan)]">
          {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>
    </>
  );
}
