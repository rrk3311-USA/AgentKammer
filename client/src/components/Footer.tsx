export function Footer() {
  return (
    <footer className="bg-brand-midnight text-brand-ivory">
      <div className="mx-auto max-w-7xl px-6 py-12 text-center lg:px-10 lg:py-14">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-ivory">Agent Kammer</p>
        <p className="mt-2 text-xs uppercase tracking-[0.18em] text-brand-champagne">Modern Manhattan Luxury</p>
        <p className="mt-1 text-xs uppercase tracking-[0.14em] text-brand-ivory/75">
          Leasing • Strategic Acquisition • Building Intelligence
        </p>
        <address className="mt-6 text-sm not-italic leading-7 text-brand-ivory/80">
          <span>New York, NY</span>
          <span className="mx-2 text-brand-steel/40">/</span>
          <a href="mailto:info@agentkammer.com" className="hover:underline">
            info@AgentKammer.com
          </a>
        </address>
        <p className="mt-6 text-xs tracking-[0.06em] text-brand-ivory/55">Copyright 2026</p>
      </div>
    </footer>
  );
}
