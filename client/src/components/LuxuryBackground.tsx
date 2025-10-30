export function LuxuryBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30" />
      
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary/8 to-transparent blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-primary/8 to-transparent blur-3xl" />
      <div className="absolute top-1/3 right-1/3 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-primary/5 to-transparent blur-3xl" />
    </div>
  );
}
