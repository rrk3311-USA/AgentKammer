import { FloatingChatAssistant } from "../FloatingChatAssistant";

export default function FloatingChatAssistantExample() {
  return (
    <div className="h-screen relative bg-background">
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Sample Page Content</h1>
        <p>The AI chat assistant floats on the right side of the screen.</p>
      </div>
      <FloatingChatAssistant />
    </div>
  );
}
