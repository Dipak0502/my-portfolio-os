import { content } from "@/lib/content";

export function EducationApp() {
  return (
    <div className="space-y-4">
      <h1 className="pixel text-xs text-[var(--color-neon-lime)]">&gt; EDUCATION</h1>
      {content.education.map((e) => (
        <div
          key={e.school}
          className="p-3"
          style={{
            background: "var(--color-desktop-2)",
            boxShadow: "inset 2px 2px 0 var(--color-neon-cyan), inset -2px -2px 0 #000",
          }}
        >
          <div className="pixel text-[10px] text-[var(--color-neon-yellow)]">{e.degree}</div>
          <div className="text-[18px] mt-1">{e.school}</div>
          <div className="pixel text-[9px] text-[var(--color-neon-magenta)] mt-1">{e.period}</div>
          <div className="text-[16px] mt-1 opacity-80">{e.note}</div>
        </div>
      ))}
    </div>
  );
}
