import { content } from "@/lib/content";

export function ProjectsApp() {
  return (
    <div className="space-y-4">
      <h1 className="pixel text-xs text-[var(--color-neon-lime)]">&gt; PROJECTS/</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {content.projects.map((p) => (
          <div
            key={p.id}
            className="p-3 flex flex-col"
            style={{
              background: "var(--color-desktop-2)",
              boxShadow: "inset 2px 2px 0 var(--color-neon-cyan), inset -2px -2px 0 #000",
            }}
          >
            <div className="pixel text-[10px] text-[var(--color-neon-yellow)]">{p.name}</div>
            <div className="pixel text-[9px] text-[var(--color-neon-magenta)] mt-1">{p.stack}</div>
            <p className="text-[16px] mt-2">{p.description}</p>
            <ul className="text-[15px] mt-2 space-y-1 list-none">
              {p.bullets.map((b) => (
                <li key={b}>
                  <span className="text-[var(--color-neon-lime)]">▸</span> {b}
                </li>
              ))}
            </ul>
            <a
              href={p.link}
              target="_blank"
              rel="noreferrer"
              className="pixel-btn mt-3 inline-block text-center"
            >
              VIEW ON GITHUB →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
