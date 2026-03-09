"use client";

import { useRef, useEffect } from "react";
import { ChatMessage as ChatMessageType } from "@/lib/types";
import { ChatMessage } from "./ChatMessage";

interface ChatMessageListProps {
  messages: ChatMessageType[];
  isTyping: boolean;
}

export function ChatMessageList({ messages, isTyping }: ChatMessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto light-scrollbar bg-white">
      <div className="max-w-250 mx-auto px-4 py-8 flex flex-col gap-6">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isTyping && (
          <div className="flex items-center gap-1 py-3" aria-label="Agent is typing">
            <div className="flex gap-1">
              <span className="w-2 h-2 rounded-full bg-chat-text-secondary animate-chat-dot-1" />
              <span className="w-2 h-2 rounded-full bg-chat-text-secondary animate-chat-dot-2" />
              <span className="w-2 h-2 rounded-full bg-chat-text-secondary animate-chat-dot-3" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
