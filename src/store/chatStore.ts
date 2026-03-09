import { create } from "zustand";
import { ChatMessage, MessageContentBlock } from "@/lib/types";
import { getScriptForAgent, getInitialUserMessage } from "@/lib/chat-scripts";

interface ChatStoreState {
  messages: ChatMessage[];
  isTyping: boolean;
  scriptIndex: number;
  agentId: string | null;
  _timeoutId: ReturnType<typeof setTimeout> | null;
  initChat: (agentId: string) => void;
  sendMessage: (text: string) => void;
  sendFileMessage: (fileName: string, fileSize: number) => void;
  reset: () => void;
}

const FALLBACK_TEXT =
  "Thank you for providing that information. Your Credit Memo agent configuration is now complete. You can find it in the Agent Studio.";

const FALLBACK_BLOCKS: MessageContentBlock[] = [
  { type: "text", text: FALLBACK_TEXT },
];

export const useChatStore = create<ChatStoreState>((set, get) => ({
  messages: [],
  isTyping: false,
  scriptIndex: 0,
  agentId: null,
  _timeoutId: null,

  initChat: (agentId: string) => {
    const { _timeoutId } = get();
    if (_timeoutId) clearTimeout(_timeoutId);

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: getInitialUserMessage(agentId),
      timestamp: new Date(),
    };

    set({
      messages: [userMessage],
      isTyping: true,
      scriptIndex: 0,
      agentId,
      _timeoutId: null,
    });

    const timeoutId = setTimeout(() => {
      const script = getScriptForAgent(agentId);
      const exchange = script[0];

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: exchange ? exchange.assistantText : FALLBACK_TEXT,
        structuredContent: exchange
          ? exchange.assistantMessages
          : FALLBACK_BLOCKS,
        timestamp: new Date(),
      };

      set((state) => ({
        messages: [...state.messages, assistantMessage],
        isTyping: false,
        scriptIndex: 1,
        _timeoutId: null,
      }));
    }, 1200);

    set({ _timeoutId: timeoutId });
  },

  sendMessage: (text: string) => {
    const { scriptIndex, agentId, _timeoutId } = get();
    if (_timeoutId) clearTimeout(_timeoutId);

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    set((state) => ({
      messages: [...state.messages, userMessage],
      isTyping: true,
    }));

    const script = getScriptForAgent(agentId ?? "");
    const exchange = script[scriptIndex];

    const timeoutId = setTimeout(() => {
      const structuredContent = exchange
        ? exchange.assistantMessages
        : FALLBACK_BLOCKS;
      const content = exchange ? exchange.assistantText : FALLBACK_TEXT;

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content,
        structuredContent,
        timestamp: new Date(),
      };

      set((state) => ({
        messages: [...state.messages, assistantMessage],
        isTyping: false,
        scriptIndex: state.scriptIndex + 1,
        _timeoutId: null,
      }));
    }, 1200);

    set({ _timeoutId: timeoutId });
  },

  sendFileMessage: (fileName: string, fileSize: number) => {
    const { scriptIndex, agentId, _timeoutId } = get();
    if (_timeoutId) clearTimeout(_timeoutId);

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: `[Uploaded: ${fileName}]`,
      attachment: { name: fileName, size: fileSize },
      timestamp: new Date(),
    };

    set((state) => ({
      messages: [...state.messages, userMessage],
      isTyping: true,
    }));

    const script = getScriptForAgent(agentId ?? "");
    const exchange = script[scriptIndex];

    const timeoutId = setTimeout(() => {
      const structuredContent = exchange
        ? exchange.assistantMessages
        : FALLBACK_BLOCKS;
      const content = exchange ? exchange.assistantText : FALLBACK_TEXT;

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content,
        structuredContent,
        timestamp: new Date(),
      };

      set((state) => ({
        messages: [...state.messages, assistantMessage],
        isTyping: false,
        scriptIndex: state.scriptIndex + 1,
        _timeoutId: null,
      }));
    }, 1200);

    set({ _timeoutId: timeoutId });
  },

  reset: () => {
    const { _timeoutId } = get();
    if (_timeoutId) clearTimeout(_timeoutId);
    set({
      messages: [],
      isTyping: false,
      scriptIndex: 0,
      agentId: null,
      _timeoutId: null,
    });
  },
}));
