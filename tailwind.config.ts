import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        secondary: "#131A21",
        "accent-purple": "#7F56D9",
        "accent-blue": "#4D65FF",
        "accent-green": "#22C55E",
        "accent-amber": "#F59E0B",
        "accent-red": "#EF4444",
        "text-primary": "#FFFFFF",
        "text-secondary": "#999999",
        "text-muted": "#666666",
        "border-subtle": "rgba(255,255,255,0.15)",
        "surface-elevated": "#1A2332",
        "surface-overlay": "#0D1117",
        "sidebar-bg": "#101828",
        "sidebar-border": "#252B37",
        "sidebar-text": "#A4A7AE",
        "sidebar-text-active": "#FFFFFF",
        "content-bg": "#FFFFFF",
        "content-title": "#131A21",
        "content-text": "#475467",
        "content-text-muted": "#98A2B3",
        "card-bg": "#FFFFFF",
        "card-border": "#D5D7DA",
        "card-title": "#131A21",
        "card-description": "#475467",
        "input-border": "#D5D7DA",
        "input-placeholder": "#98A2B3",
        "chat-text": "#414651",
        "chat-text-secondary": "#535862",
        "chat-border": "#E9EAEB",
        "chat-card-bg": "#FAFAFA",
        "accent-purple-dark": "#6941C6",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      keyframes: {
        chatDotBounce: {
          "0%, 80%, 100%": { opacity: "0.3", transform: "scale(0.8)" },
          "40%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "chat-dot-1": "chatDotBounce 1.4s infinite ease-in-out 0ms",
        "chat-dot-2": "chatDotBounce 1.4s infinite ease-in-out 200ms",
        "chat-dot-3": "chatDotBounce 1.4s infinite ease-in-out 400ms",
      },
    },
  },
  plugins: [],
};

export default config;
