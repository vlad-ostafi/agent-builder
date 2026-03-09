"use client";

import { useState, type KeyboardEvent } from "react";
import { Check } from "lucide-react";
import { SourceOption } from "@/lib/types";

interface SourceCardsProps {
  sources: SourceOption[];
}

export function SourceCards({ sources }: SourceCardsProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    for (const source of sources) {
      if (source.selected) initial.add(source.id);
    }
    return initial;
  });

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleKeyDown = (e: KeyboardEvent, id: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleSelection(id);
    }
  };

  return (
    <div className="flex gap-4 w-full">
      {sources.map((source) => {
        const isSelected = selectedIds.has(source.id);
        return (
          <div
            key={source.id}
            role="button"
            tabIndex={0}
            onClick={() => toggleSelection(source.id)}
            onKeyDown={(e) => handleKeyDown(e, source.id)}
            className={`flex-1 rounded-lg p-3 cursor-pointer transition-colors ${
              isSelected
                ? "bg-white border-2 border-accent-purple"
                : "bg-chat-card-bg border border-chat-border"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-base text-chat-text">
                {source.title}
              </span>
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                  isSelected
                    ? "bg-accent-purple border-accent-purple text-white"
                    : "border-chat-border bg-white"
                }`}
              >
                {isSelected && <Check size={14} />}
              </div>
            </div>
            <p className="text-sm font-medium text-chat-text-secondary mt-3 line-clamp-2">
              {source.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
