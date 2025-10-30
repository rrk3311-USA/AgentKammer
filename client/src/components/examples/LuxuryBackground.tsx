import { LuxuryBackground } from "../LuxuryBackground";

export default function LuxuryBackgroundExample() {
  return (
    <div className="relative h-screen bg-[#0a0f1a]">
      <LuxuryBackground />
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white">
          <h1 className="text-4xl font-serif mb-4">Luxury Background Pattern</h1>
          <p className="text-muted-foreground">Elegant, subtle, sophisticated</p>
        </div>
      </div>
    </div>
  );
}
