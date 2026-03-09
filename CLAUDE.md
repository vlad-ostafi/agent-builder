# Agent Builder - Project Conventions

## Tech Stack
- Next.js 16 App Router with TypeScript strict mode
- Tailwind CSS 4 (via @tailwindcss/postcss)
- Zustand for all client-side state management
- @dnd-kit for drag-and-drop interactions
- lucide-react for icons
- js-yaml for YAML export

## Architecture
- Single-page application, all state managed client-side with Zustand
- Dark theme throughout (black background, white text, Inter font)
- Path alias: `@/*` maps to `./src/*`

## Component Conventions
- Add `"use client"` directive only when the component uses hooks, event handlers, or browser APIs
- Server Components are the default; keep them server-side when possible
- Place shared components in `src/components/`
- Place Zustand stores in `src/store/`
- Place TypeScript types/interfaces in `src/types/`

## Styling
- Use Tailwind utility classes; avoid inline styles
- Custom color tokens defined in `tailwind.config.ts` (accent-purple, accent-blue, accent-green, accent-amber, accent-red, surface-elevated, surface-overlay, etc.)
- Use `text-text-primary`, `text-text-secondary`, `text-text-muted` for text colors
- Use `border-border-subtle` for borders
- Use `bg-surface-elevated` and `bg-surface-overlay` for elevated surfaces

## Code Quality
- TypeScript strict mode is enabled; no `any` types without justification
- Prefer named exports for components
- Keep components focused and composable
