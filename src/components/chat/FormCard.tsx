"use client";

import { useState } from "react";
import { FormField } from "@/lib/types";
import { useChatStore } from "@/store/chatStore";

interface FormCardProps {
  title: string;
  fields: FormField[];
}

export function FormCard({ title, fields }: FormCardProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(fieldId: string, value: string) {
    setValues((prev) => ({ ...prev, [fieldId]: value }));
  }

  function handleSubmit() {
    if (submitted) return;

    setSubmitted(true);

    const summary = fields
      .map((field) => {
        const value = values[field.id]?.trim() || field.placeholder;
        return `${field.label}: ${value}`;
      })
      .join("\n");

    useChatStore.getState().sendMessage(summary);
  }

  return (
    <div className="bg-white border border-chat-border rounded-lg p-4 flex flex-col gap-4">
      <p className="text-base font-semibold text-chat-text">{title}</p>
      <div className="border-t border-chat-border" />
      {fields.map((field) => (
        <div key={field.id} className="flex flex-col gap-2">
          <div className="flex items-center gap-0.5">
            <span className="text-base font-medium text-chat-text">
              {field.label}
            </span>
            {field.required && (
              <span className="text-sm text-accent-purple">*</span>
            )}
          </div>
          {field.helpText && (
            <p className="text-sm text-chat-text">{field.helpText}</p>
          )}
          {field.fieldType === "text" ? (
            <input
              type="text"
              placeholder={field.placeholder}
              value={values[field.id] ?? ""}
              onChange={(e) => handleChange(field.id, e.target.value)}
              disabled={submitted}
              className="w-full border border-card-border rounded-lg px-3.5 py-2.5 text-base text-chat-text shadow-sm placeholder:text-chat-text-secondary outline-none focus:border-accent-purple transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            />
          ) : (
            <textarea
              placeholder={field.placeholder}
              value={values[field.id] ?? ""}
              onChange={(e) => handleChange(field.id, e.target.value)}
              disabled={submitted}
              className="w-full h-[125px] border border-card-border rounded-lg px-3.5 py-2.5 text-base text-chat-text shadow-sm placeholder:text-chat-text-secondary outline-none focus:border-accent-purple transition-colors resize-none disabled:opacity-60 disabled:cursor-not-allowed"
            />
          )}
        </div>
      ))}
      <button
        onClick={handleSubmit}
        disabled={submitted}
        className="self-start bg-secondary text-white font-semibold rounded-lg px-4 py-2.5 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05),0px_-2px_0px_0px_rgba(16,24,40,0.05)_inset,0px_0px_0px_1px_rgba(16,24,40,0.18)_inset] hover:bg-[#1D2939] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-secondary"
      >
        Confirm &amp; continue
      </button>
    </div>
  );
}
