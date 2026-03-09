import { Minus } from "lucide-react";
import { SectionRow, SectionStatus } from "@/lib/types";

interface SectionsTableProps {
  sections: SectionRow[];
}

function getStatusStyles(status: SectionStatus): string {
  switch (status) {
    case "auto":
      return "bg-[#EFF8FF] text-[#175CD3] border-[#B2DDFF]";
    case "configured":
      return "bg-[#ECFDF3] text-[#067647] border-[#ABEFC6]";
    case "needs-input":
      return "bg-[#FFFAEB] text-[#B54708] border-[#FEDF89]";
  }
}

function getStatusLabel(status: SectionStatus): string {
  switch (status) {
    case "auto":
      return "Auto";
    case "configured":
      return "Configured";
    case "needs-input":
      return "Needs Input";
  }
}

export function SectionsTable({ sections }: SectionsTableProps) {
  return (
    <div className="bg-white border border-chat-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-[1fr_1fr_auto] px-4 py-3">
        <span className="text-xs font-medium text-chat-text-secondary">
          Section
        </span>
        <span className="text-xs font-medium text-chat-text-secondary">
          Data sources
        </span>
        <span className="text-xs font-medium text-chat-text-secondary">
          Auto-Detect
        </span>
      </div>

      {/* Rows */}
      {sections.map((section) => (
        <div
          key={section.id}
          className="grid grid-cols-[1fr_1fr_auto] items-center px-4 py-4 border-t border-chat-border"
        >
          {/* Section name with icon */}
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-accent-purple flex items-center justify-center shrink-0">
              <Minus size={12} className="text-white" />
            </div>
            <span className="text-sm font-semibold text-chat-text">
              {section.name}
            </span>
          </div>

          {/* Data sources */}
          <span className="text-sm text-chat-text">{section.dataSources}</span>

          {/* Status badge */}
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full border text-xs font-medium ${getStatusStyles(section.status)}`}
          >
            {getStatusLabel(section.status)}
          </span>
        </div>
      ))}
    </div>
  );
}
