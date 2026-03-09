"use client";

import { useState, type KeyboardEvent } from "react";
import { Check } from "lucide-react";
import { SourceOption } from "@/lib/types";
import { useChatStore } from "@/store/chatStore";

interface SourceCardsProps {
  sources: SourceOption[];
}

export function SourceCards({ sources }: SourceCardsProps) {
  const [selectedId, setSelectedId] = useState<string | null>(() => {
    const preselected = sources.find((s) => s.selected);
    return preselected ? preselected.id : null;
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (source: SourceOption) => {
    if (submitted) return;

    setSelectedId(source.id);
    setSubmitted(true);
    useChatStore.getState().sendMessage(source.title);
  };

  const handleKeyDown = (e: KeyboardEvent, source: SourceOption) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleSelect(source);
    }
  };

  return (
    <div
      className={`flex gap-4 w-full ${submitted ? "pointer-events-none opacity-70" : ""}`}
    >
      {sources.map((source) => {
        const isSelected = source.id === selectedId;
        return (
          <div
            key={source.id}
            role="button"
            tabIndex={submitted ? -1 : 0}
            onClick={() => handleSelect(source)}
            onKeyDown={(e) => handleKeyDown(e, source)}
            aria-disabled={submitted}
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
