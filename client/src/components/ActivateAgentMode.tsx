export function ActivateAgentMode() {
  return (
    <div className="w-full">
      <button
        className="w-full h-12 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-[#0a1628] font-bold text-sm tracking-widest uppercase hover:opacity-90 transition-opacity"
        data-testid="button-activate-agent-mode"
      >
        Activate Agent Mode
      </button>
      {/* Breathing pixel bar - OFF state (red) */}
      <div className="h-2 w-full bg-[#0a1628] rounded-b-lg mt-0 overflow-hidden">
        <div 
          className="h-full w-full"
          style={{
            backgroundColor: '#ef4444',
            animation: 'breathing 2s ease-in-out infinite'
          }}
        />
      </div>
      <style>{`
        @keyframes breathing {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
