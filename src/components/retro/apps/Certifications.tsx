import { content } from "@/lib/content";

export function CertificationsApp() {
  return (
    <div className="space-y-4">
      <h1 className="pixel text-xs text-[var(--color-neon-lime)]">&gt; CERTIFICATIONS</h1>
      <div className="space-y-3">
        {content.certifications.map((c) => (
          <div
            key={c.name}
            className="p-3 flex items-center gap-3"
            style={{
              background: "var(--color-desktop-2)",
              boxShadow: "inset 2px 2px 0 var(--color-neon-cyan), inset -2px -2px 0 #000",
            }}
          >
            <div className="text-3xl">🏆</div>
            <div className="flex-1">
              <div className="text-[18px]">{c.name}</div>
              <div className="pixel text-[9px] text-[var(--color-neon-yellow)] mt-1">
                {c.issuer} · {c.date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
