import { FileText, Lightbulb, X } from "lucide-react";
import { ChatMessage as ChatMessageType, MessageContentBlock } from "@/lib/types";
import { FormCard } from "./FormCard";
import { SourceCards } from "./SourceCards";
import { UploadCard } from "./UploadCard";
import { SectionsTable } from "./SectionsTable";

interface ChatMessageProps {
  message: ChatMessageType;
}

function formatTime(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes.toString().padStart(2, "0");
  return `Today ${displayHours}:${displayMinutes}${ampm}`;
}

function renderTextWithBold(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

function renderBlock(block: MessageContentBlock, index: number) {
  switch (block.type) {
    case "status":
      return (
        <div key={index} className="flex items-center gap-1">
          <Lightbulb size={16} className="text-chat-text" />
          <span className="text-sm font-medium text-chat-text">
            {block.text}
          </span>
        </div>
      );
    case "text":
      return (
        <p
          key={index}
          className="text-base leading-6 text-chat-text whitespace-pre-wrap"
        >
          {renderTextWithBold(block.text)}
        </p>
      );
    case "form":
      return (
        <FormCard key={index} title={block.title} fields={block.fields} />
      );
    case "sources":
      return <SourceCards key={index} sources={block.sources} />;
    case "upload":
      return <UploadCard key={index} />;
    case "sections-table":
      return <SectionsTable key={index} sections={block.sections} />;
  }
}

function FileAttachmentCard({ name, size }: { name: string; size: number }) {
  const formattedSize =
    size >= 1024 * 1024
      ? `${(size / (1024 * 1024)).toFixed(1)} MB`
      : `${Math.round(size / 1024)} KB`;

  return (
    <div className="bg-white border border-chat-border rounded-xl p-3 flex items-start gap-3">
      <div className="flex items-center gap-3">
        {/* PDF icon */}
        <div className="w-8 h-8 flex items-center justify-center">
          <FileText size={28} className="text-[#D92D20]" />
        </div>
        {/* File info */}
        <div className="flex flex-col gap-1 w-36">
          <p className="text-xs font-medium text-chat-text truncate">{name}</p>
          <p className="text-xs text-chat-text-secondary">{formattedSize}</p>
        </div>
      </div>
      {/* Close button */}
      <button className="w-3.5 h-3.5 rounded-full bg-gray-200 flex items-center justify-center shrink-0 mt-0.5">
        <X size={8} className="text-chat-text-secondary" />
      </button>
    </div>
  );
}

function UserBubble({ message }: { message: ChatMessageType }) {
  return (
    <div className="flex flex-col items-end gap-3 py-3">
      <div className="max-w-[395px] w-full">
        <p className="text-xs text-chat-text-secondary text-right mb-1.5">
          {formatTime(message.timestamp)}
        </p>
        <div className="bg-secondary text-white px-3.5 py-2.5 rounded-bl-lg rounded-br-lg rounded-tl-lg text-base leading-6">
          {message.content}
        </div>
      </div>
      {message.attachment && (
        <FileAttachmentCard
          name={message.attachment.name}
          size={message.attachment.size}
        />
      )}
    </div>
  );
}

function AssistantMessage({ message }: { message: ChatMessageType }) {
  return (
    <div className="w-full flex flex-col gap-3">
      {message.structuredContent
        ? message.structuredContent.map((block, i) => renderBlock(block, i))
        : (
          <p className="text-base leading-6 text-chat-text whitespace-pre-wrap">
            {message.content}
          </p>
        )}
    </div>
  );
}

export function ChatMessage({ message }: ChatMessageProps) {
  if (message.role === "user") {
    return <UserBubble message={message} />;
  }
  return <AssistantMessage message={message} />;
}
