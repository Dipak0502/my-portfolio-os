import { content } from "@/lib/content";

export function SkillsApp() {
  return (
    <div className="space-y-5">
      <h1 className="pixel text-xs text-[var(--color-neon-lime)]">&gt; SKILL_TREE.DAT</h1>
      {content.skills.map((g) => (
        <div key={g.group}>
          <div className="pixel text-[10px] text-[var(--color-neon-cyan)] mb-2">{g.group}</div>
          <div className="space-y-2">
            {g.items.map((s) => (
              <div key={s.name}>
                <div className="flex justify-between text-[16px]">
                  <span>{s.name}</span>
                  <span className="pixel text-[9px] text-[var(--color-neon-yellow)]">
                    {s.level}
                  </span>
                </div>
                <div
                  className="h-3 mt-1"
                  style={{
                    background: "#000",
                    boxShadow: "inset 1px 1px 0 #000, inset -1px -1px 0 var(--color-neon-cyan)",
                  }}
                >
                  <div
                    className="h-full"
                    style={{
                      width: `${s.level}%`,
                      background:
                        "repeating-linear-gradient(90deg, var(--color-neon-lime) 0 8px, var(--color-neon-cyan) 8px 16px)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
