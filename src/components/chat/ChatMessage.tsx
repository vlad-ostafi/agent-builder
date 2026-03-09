import { Lightbulb } from "lucide-react";
import { ChatMessage as ChatMessageType, MessageContentBlock } from "@/lib/types";
import { FormCard } from "./FormCard";
import { SourceCards } from "./SourceCards";

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
          {block.text}
        </p>
      );
    case "form":
      return (
        <FormCard key={index} title={block.title} fields={block.fields} />
      );
    case "sources":
      return <SourceCards key={index} sources={block.sources} />;
  }
}

function UserBubble({ message }: { message: ChatMessageType }) {
  return (
    <div className="flex justify-end py-3">
      <div className="max-w-[395px]">
        <p className="text-xs text-chat-text-secondary text-right mb-1.5">
          {formatTime(message.timestamp)}
        </p>
        <div className="bg-secondary text-white px-3.5 py-2.5 rounded-bl-lg rounded-br-lg rounded-tl-lg text-base leading-6">
          {message.content}
        </div>
      </div>
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
