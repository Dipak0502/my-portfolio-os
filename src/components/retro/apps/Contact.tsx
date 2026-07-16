import { useState } from "react";
import { content } from "@/lib/content";

export function ContactApp() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (label: string, value: string) => {
    navigator.clipboard?.writeText(value);
    setCopied(label);
    setTimeout(() => setCopied(null), 1500);
  };
  const c = content.contact;

  const rows: Array<{ label: string; value: string; href: string }> = [
    { label: "EMAIL", value: c.email, href: `mailto:${c.email}` },
    { label: "PHONE", value: c.phone, href: `tel:${c.phone}` },
    { label: "LINKEDIN", value: c.linkedin, href: c.linkedin },
    { label: "GITHUB", value: c.github, href: c.github },
  ];

  return (
    <div className="space-y-4">
      <h1 className="pixel text-xs text-[var(--color-neon-lime)]">&gt; CONTACT.EXE</h1>
      <div className="space-y-2">
        {rows.map((r) => (
          <div
            key={r.label}
            className="p-2 flex items-center gap-2 flex-wrap"
            style={{
              background: "var(--color-desktop-2)",
              boxShadow: "inset 2px 2px 0 var(--color-neon-cyan), inset -2px -2px 0 #000",
            }}
          >
            <span className="pixel text-[9px] text-[var(--color-neon-yellow)] w-20 shrink-0">
              {r.label}
            </span>
            <a
              href={r.href}
              target={r.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="flex-1 text-[16px] text-[var(--color-neon-cyan)] underline break-all"
            >
              {r.value}
            </a>
            <button className="pixel-btn" onClick={() => copy(r.label, r.value)}>
              {copied === r.label ? "OK!" : "COPY"}
            </button>
          </div>
        ))}
      </div>
      <a href={`mailto:${c.email}`} className="pixel-btn pixel-btn-accent inline-block">
        ✉ SEND EMAIL
      </a>
    </div>
  );
}
