"use client";

import { ChevronRight } from "lucide-react";
import { SearchFilter } from "@/components/SearchFilter";
import { AgentGrid } from "@/components/AgentGrid";

export function AgentListPage() {
  return (
    <div className="flex-1 flex flex-col h-full bg-content-bg overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-content-bg px-8 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1 text-sm mb-4">
          <span className="text-content-text-muted">Dashboard</span>
          <ChevronRight size={16} className="text-content-text-muted" />
          <span className="text-content-title font-medium">Agent Studio</span>
        </div>

        {/* Title row */}
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-semibold text-content-title tracking-[-0.72px]">
            Agent Studio
          </h1>
          <SearchFilter />
        </div>
      </header>

      {/* Body */}
      <main className="flex-1 overflow-y-auto px-8 pb-8 light-scrollbar">
        <AgentGrid />
      </main>
    </div>
  );
}
