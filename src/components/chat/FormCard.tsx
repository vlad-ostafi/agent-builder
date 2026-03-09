import { FormField } from "@/lib/types";

interface FormCardProps {
  title: string;
  fields: FormField[];
}

export function FormCard({ title, fields }: FormCardProps) {
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
              className="w-full border border-card-border rounded-lg px-3.5 py-2.5 text-base shadow-sm placeholder:text-chat-text-secondary outline-none focus:border-accent-purple transition-colors"
            />
          ) : (
            <textarea
              placeholder={field.placeholder}
              className="w-full h-[125px] border border-card-border rounded-lg px-3.5 py-2.5 text-base shadow-sm placeholder:text-chat-text-secondary outline-none focus:border-accent-purple transition-colors resize-none"
            />
          )}
        </div>
      ))}
      <button className="self-start bg-secondary text-white font-semibold rounded-lg px-4 py-2.5 shadow-sm">
        Confirm &amp; continue
      </button>
    </div>
  );
}
