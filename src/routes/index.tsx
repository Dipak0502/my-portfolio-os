import { createFileRoute } from "@tanstack/react-router";
import { DesktopProvider } from "@/lib/desktop-store";
import { Desktop } from "@/components/retro/Desktop";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DeepakOS — Retro Desktop Portfolio" },
      {
        name: "description",
        content:
          "An 8-bit desktop OS portfolio for Deepak Shambhu Paswan — Data Analyst, BI, and full-stack developer. Explore projects, skills, and mini-games.",
      },
      { property: "og:title", content: "DeepakOS — Retro Desktop Portfolio" },
      {
        property: "og:description",
        content:
          "A nostalgic retro-OS portfolio with projects, skills, and playable mini-games.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <DesktopProvider>
        <Desktop />
      </DesktopProvider>
      <div className="crt-overlay" />
    </>
  );
}
