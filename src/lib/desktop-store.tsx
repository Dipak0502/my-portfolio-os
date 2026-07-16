import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";

export type WindowId = string;

export interface WindowState {
  id: WindowId;
  title: string;
  icon: string;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
}

interface DesktopCtx {
  windows: WindowState[];
  open: (opts: { id: WindowId; title: string; icon: string; w?: number; h?: number }) => void;
  close: (id: WindowId) => void;
  focus: (id: WindowId) => void;
  minimize: (id: WindowId) => void;
  toggleMax: (id: WindowId) => void;
  move: (id: WindowId, x: number, y: number) => void;
  activeId: WindowId | null;
}

const Ctx = createContext<DesktopCtx | null>(null);

export function DesktopProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const zRef = useRef(10);
  const spawnRef = useRef(0);

  const focus = useCallback((id: WindowId) => {
    zRef.current += 1;
    const nz = zRef.current;
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, z: nz, minimized: false } : w)));
  }, []);

  const open = useCallback<DesktopCtx["open"]>(({ id, title, icon, w = 640, h = 460 }) => {
    setWindows((ws) => {
      const existing = ws.find((x) => x.id === id);
      zRef.current += 1;
      const nz = zRef.current;
      if (existing) {
        return ws.map((x) => (x.id === id ? { ...x, z: nz, minimized: false } : x));
      }
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      const winW = typeof window !== "undefined" ? window.innerWidth : 1200;
      const winH = typeof window !== "undefined" ? window.innerHeight : 800;
      const cascade = spawnRef.current * 28;
      spawnRef.current = (spawnRef.current + 1) % 8;
      const wW = isMobile ? winW : Math.min(w, winW - 40);
      const wH = isMobile ? winH - 56 : Math.min(h, winH - 100);
      const x = isMobile ? 0 : Math.max(20, (winW - wW) / 2 + cascade - 100);
      const y = isMobile ? 0 : Math.max(20, (winH - wH) / 2 + cascade - 100);
      return [
        ...ws,
        {
          id,
          title,
          icon,
          x,
          y,
          w: wW,
          h: wH,
          z: nz,
          minimized: false,
          maximized: isMobile,
        },
      ];
    });
  }, []);

  const close = useCallback((id: WindowId) => {
    setWindows((ws) => ws.filter((w) => w.id !== id));
  }, []);

  const minimize = useCallback((id: WindowId) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, minimized: !w.minimized } : w)));
  }, []);

  const toggleMax = useCallback((id: WindowId) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, maximized: !w.maximized } : w)));
  }, []);

  const move = useCallback((id: WindowId, x: number, y: number) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, x, y } : w)));
  }, []);

  const activeId = useMemo(() => {
    const visible = windows.filter((w) => !w.minimized);
    if (!visible.length) return null;
    return visible.reduce((a, b) => (a.z > b.z ? a : b)).id;
  }, [windows]);

  const value: DesktopCtx = { windows, open, close, focus, minimize, toggleMax, move, activeId };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useDesktop() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useDesktop must be inside DesktopProvider");
  return v;
}
