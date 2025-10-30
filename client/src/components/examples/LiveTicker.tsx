import { LiveTicker } from "../LiveTicker";

export default function LiveTickerExample() {
  return (
    <div className="h-screen relative">
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Sample Content</h1>
        <p>The ticker is fixed at the bottom of the viewport.</p>
      </div>
      <LiveTicker />
    </div>
  );
}
