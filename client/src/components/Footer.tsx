export function Footer() {
  return (
    <footer className="border-t border-brand-border bg-brand-ivory text-brand-graphite">
      <div className="mx-auto flex w-full max-w-site flex-col gap-3 px-6 py-8 text-[10px] uppercase tracking-[0.18em] sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <p>Copyright 2026 Agent Kammer</p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <span>Privacy</span>
          <span>Terms</span>
          <span>Licenses</span>
        </div>
      </div>
    </footer>
  );
}
