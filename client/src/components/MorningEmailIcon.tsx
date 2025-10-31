import { Mail, Coffee, Smile } from "lucide-react";

export function MorningEmailIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <div className="relative inline-block">
      <Mail className={`${className} text-primary absolute inset-0 morning-icon-1`} />
      <Coffee className={`${className} text-primary absolute inset-0 morning-icon-2`} />
      <Smile className={`${className} text-primary absolute inset-0 morning-icon-3`} />
    </div>
  );
}
