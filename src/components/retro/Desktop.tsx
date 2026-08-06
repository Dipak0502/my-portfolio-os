import { useEffect, useState } from "react";
import { useDesktop } from "@/lib/desktop-store";
import { APPS, APPS_BY_ID } from "./apps/registry";
import { Window } from "./Window";
import { Taskbar } from "./Taskbar";
import { BootScreen } from "./BootScreen";

export function Desktop() {
  const { windows, open } = useDesktop();
  const [selected, setSelected] = useState<string | null>(null);
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    const already = sessionStorage.getItem("booted");
    if (already) setBooted(true);
  }, []);

  const finishBoot = () => {
    sessionStorage.setItem("booted", "1");
    setBooted(true);
  };

  if (!booted) return <BootScreen onDone={finishBoot} />;

  const desktopIcons = APPS.filter((a) => a.desktop);

  return (
    <div
      className="desktop-bg fixed inset-0 overflow-hidden select-none"
      onMouseDown={() => setSelected(null)}
    >
      {/* Icon grid */}
      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 grid-flow-row gap-x-6 gap-y-5 place-items-start">
        {desktopIcons.map((a) => (
          <button
            key={a.id}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={() => setSelected(a.id)}
            onDoubleClick={() => open({ id: a.id, title: a.title, icon: a.icon, w: a.w, h: a.h })}
            className={`icon-tile flex flex-col items-center gap-2 w-28 p-2 ${selected === a.id ? "selected" : ""}`}
          >
            <span className="icon-glyph text-3xl">{a.icon}</span>
            <span
              className="icon-label pixel text-[8px] leading-[1.5] text-center px-1.5 py-0.5 text-white break-words whitespace-normal w-full"
              style={{ textShadow: "1px 1px 0 #000" }}
            >
              {a.title}
            </span>
          </button>
        ))}
      </div>

      {/* Header sticker */}
      <div className="absolute top-4 right-4 pixel text-[10px] text-white text-right pointer-events-none">
        <div className="text-[var(--color-neon-lime)]">DEEPAK-OS v1.0</div>
        <div className="text-[9px] opacity-80 mt-1">DOUBLE-CLICK ANY ICON</div>
      </div>

      {/* Windows */}
      {windows.map((w) => {
        const App = APPS_BY_ID[w.id]?.component;
        if (!App) return null;
        return (
          <Window key={w.id} id={w.id}>
            <App />
          </Window>
        );
      })}

      <Taskbar />

      {/* Mobile helper */}
      {typeof window !== "undefined" && window.innerWidth < 768 && !windows.length && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 pixel text-[9px] text-white text-center px-4">
          TAP AN ICON TO OPEN
        </div>
      )}
    </div>
  );
}
