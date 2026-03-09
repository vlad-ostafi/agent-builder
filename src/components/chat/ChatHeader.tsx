import { ChevronDown } from "lucide-react";

interface ChatHeaderProps {
  agentName: string;
}

export function ChatHeader({ agentName }: ChatHeaderProps) {
  return (
    <div className="bg-white border-b border-chat-border px-4 py-[19px] flex items-center justify-between">
      <p className="text-xl font-semibold text-content-title truncate">
        Configure {agentName} Agent Variant
      </p>
      <button className="bg-white border border-card-border rounded-lg px-4 py-2.5 font-semibold text-content-text shadow-sm flex items-center gap-1.5">
        More actions
        <ChevronDown size={20} />
      </button>
    </div>
  );
}
