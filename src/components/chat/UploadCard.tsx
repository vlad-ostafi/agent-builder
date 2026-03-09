"use client";

import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { useChatStore } from "@/store/chatStore";

export function UploadCard() {
  const [uploaded, setUploaded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (!uploaded) {
      inputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploaded(true);
    useChatStore.getState().sendFileMessage(file.name, file.size);
  };

  return (
    <div
      onClick={handleClick}
      className={`bg-white border border-chat-border rounded-xl px-6 py-4 flex flex-col items-center gap-3 w-full cursor-pointer ${
        uploaded ? "pointer-events-none opacity-60" : ""
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={handleFileChange}
      />
      {/* Icon box */}
      <div className="w-10 h-10 border border-chat-border rounded-lg flex items-center justify-center shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05),0px_-2px_0px_0px_rgba(10,13,18,0.05)_inset,0px_0px_0px_1px_rgba(10,13,18,0.18)_inset]">
        <Upload size={20} className="text-chat-text-secondary" />
      </div>
      {/* Text */}
      <div className="flex flex-col items-center gap-1">
        <p className="text-sm leading-5">
          <span className="font-semibold text-accent-purple-dark">
            Click to upload
          </span>{" "}
          <span className="text-chat-text-secondary">or drag and drop</span>
        </p>
        <p className="text-xs text-chat-text-secondary">
          (max. 50 documents, 30mb per document)
        </p>
      </div>
    </div>
  );
}
