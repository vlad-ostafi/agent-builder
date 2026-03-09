import { create } from "zustand";
import { AgentDefinition, DisplayCategory, DISPLAY_CATEGORY_ORDER } from "@/lib/types";
import { agentSeedData } from "@/lib/agents";

interface AgentStoreState {
  agents: AgentDefinition[];
  searchTerm: string;
  selectedCategory: DisplayCategory | null;
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: DisplayCategory | null) => void;
}

export const useAgentStore = create<AgentStoreState>((set) => ({
  agents: agentSeedData,
  searchTerm: "",
  selectedCategory: null,
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
}));

export const selectFilteredGroupedAgents = (
  state: AgentStoreState
): Partial<Record<DisplayCategory, AgentDefinition[]>> => {
  const { agents, searchTerm, selectedCategory } = state;
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

  const grouped: Partial<Record<DisplayCategory, AgentDefinition[]>> = {};

  for (const category of DISPLAY_CATEGORY_ORDER) {
    const categoryAgents = filtered.filter(
      (agent) => agent.displayCategory === category
    );
    if (categoryAgents.length > 0) {
      grouped[category] = categoryAgents;
    }
  }

  return grouped;
};
