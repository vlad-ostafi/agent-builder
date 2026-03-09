"use client";

import { useState, type FormEvent } from "react";
import { Globe, Paperclip, CornerDownLeft } from "lucide-react";

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled = false }: ChatInputProps) {
  const [text, setText] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setText("");
  };

  return (
    <div className="flex justify-center border-t border-chat-border p-4 bg-white">
      <form
        onSubmit={handleSubmit}
        className="flex items-center rounded-full max-w-250 w-full border border-chat-border bg-white p-3 shadow-[0px_2.4px_4.8px_0px_rgba(54,58,63,0.1)]"
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ask a follow up question..."
          disabled={disabled}
          className="flex-1 min-w-0 bg-transparent text-lg font-normal leading-7 text-content-title placeholder:text-[#717680] outline-none disabled:opacity-50 disabled:pointer-events-none"
        />

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            aria-label="Web search"
            className="flex h-10 w-10 items-center justify-center rounded-md text-content-text-muted hover:bg-gray-100 transition-colors"
          >
            <Globe size={20} />
          </button>

          <button
            type="button"
            aria-label="Attach file"
            className="flex h-10 w-10 items-center justify-center rounded-md text-content-text-muted hover:bg-gray-100 transition-colors"
          >
            <Paperclip size={20} />
          </button>

          <button
            type="submit"
            disabled={disabled || !text.trim()}
            aria-label="Send message"
            className="flex h-[43px] w-[43px] items-center justify-center rounded-full bg-sidebar-bg text-white disabled:opacity-50 transition-colors"
          >
            <CornerDownLeft size={24} />
          </button>
        </div>
      </form>
    </div>
  );
}
