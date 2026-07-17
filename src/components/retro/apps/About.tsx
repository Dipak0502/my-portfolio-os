import { content } from "@/lib/content";
import avatarAsset from "@/assets/deepak-avatar.jpg.asset.json";

export function AboutApp() {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-4">
        <div
          className="w-24 h-24 shrink-0 overflow-hidden"
          style={{
            background: "var(--color-titlebar)",
            boxShadow: "inset 2px 2px 0 var(--color-neon-cyan), inset -2px -2px 0 #000",
          }}
        >
          <img
            src={avatarAsset.url}
            alt={content.name}
            className="w-full h-full object-cover"
            style={{ imageRendering: "auto" }}
          />
        </div>
        <div>
          <h1 className="pixel text-sm text-[var(--color-neon-lime)]">{content.name}</h1>
          <p className="pixel text-[9px] mt-2 text-[var(--color-neon-cyan)]">{content.tagline}</p>
        </div>
      </div>
      <p className="text-[18px] leading-snug">{content.summary}</p>
      <div>
        <div className="pixel text-[10px] text-[var(--color-neon-magenta)] mb-2">&gt; LANGUAGES</div>
        <div className="flex flex-wrap gap-2">
          {content.languages.map((l) => (
            <span key={l} className="pixel-btn text-[10px]">
              {l}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
