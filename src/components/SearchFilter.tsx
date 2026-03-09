"use client";

import { useState, useRef, useEffect } from "react";
import { Search, ListFilter } from "lucide-react";
import { useAgentStore } from "@/store/agentStore";
import {
  DisplayCategory,
  DISPLAY_CATEGORY_LABELS,
  DISPLAY_CATEGORY_ORDER,
} from "@/lib/types";

export function SearchFilter() {
  const searchTerm = useAgentStore((s) => s.searchTerm);
  const setSearchTerm = useAgentStore((s) => s.setSearchTerm);
  const selectedCategory = useAgentStore((s) => s.selectedCategory);
  const setSelectedCategory = useAgentStore((s) => s.setSelectedCategory);

  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filterLabel = selectedCategory
    ? DISPLAY_CATEGORY_LABELS[selectedCategory]
    : "Filter by";

  return (
    <div className="flex items-center gap-3">
      {/* Search input */}
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-input-placeholder"
        />
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-96 rounded-lg border border-input-border pl-10 pr-4 py-2 text-base text-content-title bg-white placeholder:text-input-placeholder outline-none focus:border-accent-purple transition-colors"
        />
      </div>

      {/* Filter dropdown */}
      <div className="relative" ref={filterRef}>
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          aria-expanded={filterOpen}
          aria-haspopup="listbox"
          className="flex items-center gap-2 rounded-lg border border-input-border px-3 py-2 text-sm font-semibold text-content-text bg-white hover:bg-gray-50 transition-colors"
        >
          <ListFilter size={16} />
          <span>{filterLabel}</span>
        </button>

        {filterOpen && (
          <div className="absolute right-0 top-full mt-1 w-56 rounded-lg border border-input-border bg-white shadow-lg z-50">
            <button
              onClick={() => {
                setSelectedCategory(null);
                setFilterOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                !selectedCategory
                  ? "text-accent-purple font-semibold"
                  : "text-content-text"
              }`}
            >
              All
            </button>
            {DISPLAY_CATEGORY_ORDER.map((cat: DisplayCategory) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setFilterOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                  selectedCategory === cat
                    ? "text-accent-purple font-semibold"
                    : "text-content-text"
                }`}
              >
                {DISPLAY_CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
