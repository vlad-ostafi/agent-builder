import { Settings, Plus } from "lucide-react";
import { AgentDefinition } from "@/lib/types";
import { CATEGORY_COLORS } from "@/lib/category-colors";

interface AgentCardProps {
  agent: AgentDefinition;
}

export function AgentCard({ agent }: AgentCardProps) {
  const dotColor = CATEGORY_COLORS[agent.displayCategory];

  return (
    <div className="bg-card-bg rounded-lg border border-card-border p-4 hover:shadow-md transition-shadow">
      {/* Top row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`inline-block w-2 h-2 rounded-full ${dotColor}`}
          />
          <span className="text-sm font-semibold text-card-title">
            {agent.name}
          </span>
        </div>
        <button aria-label="Agent settings" className="text-content-text-muted hover:text-content-text transition-colors">
          <Settings size={16} />
        </button>
      </div>

      {/* Body */}
      <p className="text-xs text-card-description leading-relaxed line-clamp-3 mt-2">
        {agent.summary}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-3">
        <button className="text-accent-purple text-sm font-medium cursor-pointer hover:underline">
          Initiate
        </button>
        <button aria-label="Add agent" className="flex items-center justify-center w-6 h-6 rounded-full border border-card-border text-content-text-muted hover:text-content-text hover:border-content-text transition-colors">
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
}
