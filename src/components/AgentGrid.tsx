"use client";

import { useMemo } from "react";
import { useAgentStore } from "@/store/agentStore";
import {
  AgentDefinition,
  DisplayCategory,
  DISPLAY_CATEGORY_ORDER,
  DISPLAY_CATEGORY_LABELS,
} from "@/lib/types";
import { AgentCard } from "@/components/AgentCard";

export function AgentGrid() {
  const agents = useAgentStore((s) => s.agents);
  const searchTerm = useAgentStore((s) => s.searchTerm);
  const selectedCategory = useAgentStore((s) => s.selectedCategory);

  const grouped = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();

    const filtered = agents.filter((agent) => {
      const matchesSearch =
        !searchTerm ||
        agent.name.toLowerCase().includes(lowerSearch) ||
        agent.summary.toLowerCase().includes(lowerSearch);
      const matchesCategory =
        !selectedCategory || agent.displayCategory === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    const result: Partial<Record<DisplayCategory, AgentDefinition[]>> = {};
    for (const category of DISPLAY_CATEGORY_ORDER) {
      const categoryAgents = filtered.filter(
        (agent) => agent.displayCategory === category
      );
      if (categoryAgents.length > 0) {
        result[category] = categoryAgents;
      }
    }
    return result;
  }, [agents, searchTerm, selectedCategory]);

  const hasAny = DISPLAY_CATEGORY_ORDER.some(
    (cat) => (grouped[cat]?.length ?? 0) > 0
  );

  if (!hasAny) {
    return (
      <div className="flex items-center justify-center h-64 text-content-text-muted text-base">
        No agents found
      </div>
    );
  }

  return (
    <div>
      {DISPLAY_CATEGORY_ORDER.map((cat) => {
        const catAgents = grouped[cat];
        if (!catAgents || catAgents.length === 0) return null;

        return (
          <section key={cat}>
            <h2 className="text-base font-semibold text-content-title mb-4 pl-1">
              {DISPLAY_CATEGORY_LABELS[cat]}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
              {catAgents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
