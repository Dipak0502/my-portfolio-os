import { content } from "@/lib/content";

export function InterestsApp() {
  return (
    <div className="space-y-3">
      <h1 className="pixel text-xs text-[var(--color-neon-lime)]">&gt; INTERESTS</h1>
      <div className="flex flex-wrap gap-2">
        {content.interests.map((i) => (
          <span key={i} className="pixel-btn text-[10px]">
            {i}
          </span>
        ))}
      </div>
    </div>
  );
}
