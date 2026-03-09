"use client";

import { useEffect } from "react";
import { AgentDefinition } from "@/lib/types";
import { useChatStore } from "@/store/chatStore";
import { ChatHeader } from "./ChatHeader";
import { ChatMessageList } from "./ChatMessageList";
import { ChatInput } from "./ChatInput";

interface ChatContainerProps {
  agent: AgentDefinition;
}

export function ChatContainer({ agent }: ChatContainerProps) {
  const messages = useChatStore((s) => s.messages);
  const isTyping = useChatStore((s) => s.isTyping);
  const sendMessage = useChatStore((s) => s.sendMessage);
  const initChat = useChatStore((s) => s.initChat);
  const reset = useChatStore((s) => s.reset);

  useEffect(() => {
    initChat(agent.id);
    return () => {
      reset();
    };
  }, [agent.id, initChat, reset]);

  return (
    <div className="flex-1 flex flex-col h-full bg-content-bg overflow-hidden">
      <ChatHeader agentName={agent.name} />
      <ChatMessageList messages={messages} isTyping={isTyping} />
      <ChatInput onSend={sendMessage} disabled={isTyping} />
    </div>
  );
}
