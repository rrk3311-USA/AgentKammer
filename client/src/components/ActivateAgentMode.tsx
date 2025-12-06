export function ActivateAgentMode() {
  return (
    <div className="w-full">
      <button
        className="w-full h-12 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-[#0a1628] font-bold text-sm tracking-widest uppercase hover:opacity-90 transition-opacity"
        data-testid="button-activate-agent-mode"
      >
        Activate Agent Mode
      </button>
      {/* Progress bar */}
      <div className="h-1 w-full bg-[#0a1628]/20 rounded-b-lg mt-0.5 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-[#d4af37] to-[#f4d03f] animate-pulse" style={{ width: '100%' }} />
      </div>
    </div>
  );
}
