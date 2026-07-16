export function ResumeApp() {
  return (
    <div className="space-y-4 text-center">
      <div className="text-6xl">📄</div>
      <h1 className="pixel text-xs text-[var(--color-neon-lime)]">RESUME.PDF</h1>
      <p className="text-[16px]">
        Grab a static PDF copy of the resume — same content, printable format.
      </p>
      <p className="text-[14px] opacity-70">
        (Recruiters: this button downloads the PDF version of everything in DeepakOS.)
      </p>
      <a
        href="/resume.pdf"
        download
        className="pixel-btn pixel-btn-accent inline-block"
      >
        ⬇ DOWNLOAD RESUME
      </a>
    </div>
  );
}
