# CLAUDE.md — EasyMeasurement

This file provides guidance for AI assistants (Claude and others) working in this repository.

---

## Project Overview

**EasyMeasurement** is a React single-page application (SPA) built with a modern TypeScript + Vite stack. The project is in early development and currently displays a landing page. The goal is to build a measurement tool with a clean, accessible UI.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 with TypeScript |
| Build tool | Vite 5 (SWC compiler via `@vitejs/plugin-react-swc`) |
| Routing | React Router DOM v6 |
| Styling | Tailwind CSS 3 |
| Component primitives | Radix UI (25+ packages) |
| Icons | Lucide React |
| Variant management | Class Variance Authority (CVA) |
| Class utilities | clsx + tailwind-merge (exposed as `cn()`) |
| Testing | Vitest + Testing Library (React, User Event, Jest DOM) |
| Linting | ESLint 8 with TypeScript + React Hooks plugins |

---

## Directory Structure

```
/
├── index.html                  # HTML entry point (mounts React at #root)
├── vite.config.ts              # Vite + Vitest configuration
├── tailwind.config.ts          # Tailwind theme (CSS variables, dark mode)
├── tsconfig.json               # TypeScript configuration (strict mode)
├── tsconfig.node.json          # TypeScript config for Node tooling
├── postcss.config.js           # PostCSS (Tailwind + Autoprefixer)
├── .eslintrc.cjs               # ESLint rules
├── .claude/
│   ├── settings.json           # Claude Code hooks configuration
│   └── hooks/session-start.sh  # Runs `npm install` at session start
└── src/
    ├── main.tsx                # React root (StrictMode + createRoot)
    ├── App.tsx                 # Root component with Router + Routes
    ├── index.css               # Global styles + Tailwind layers + CSS vars
    ├── lib/
    │   └── utils.ts            # cn() utility (clsx + tailwind-merge)
    ├── pages/
    │   └── Index.tsx           # Home page ("/" route)
    └── test/
        ├── setup.ts            # Vitest setup (imports jest-dom matchers)
        └── App.test.tsx        # Example component test
```

---

## Development Commands

```bash
npm run dev        # Start dev server at http://localhost:5173 (Vite HMR)
npm run build      # Type-check (tsc) then build for production → dist/
npm run preview    # Preview the production build locally
npm run lint       # Run ESLint (zero warnings allowed)
npm test           # Run all tests once with Vitest
```

Run `npm install` before starting if dependencies are not installed. The `.claude/hooks/session-start.sh` hook does this automatically in Claude Code web sessions.

---

## Key Conventions

### TypeScript
- Strict mode is enabled (`"strict": true` plus `noUnusedLocals`, `noUnusedParameters`).
- All new code must be fully typed — avoid `any`.
- Path alias `@/*` maps to `./src/*`. Use it for all intra-project imports (e.g. `import { cn } from "@/lib/utils"`).

### Components
- Use functional components with TypeScript (`const Foo = () => { ... }; export default Foo;`).
- PascalCase filenames for components (e.g. `MyComponent.tsx`).
- Place page-level components in `src/pages/`.
- Place reusable UI components in `src/components/` (create this directory as the project grows).
- Prefer Radix UI primitives for interactive elements (dialogs, dropdowns, forms) to ensure accessibility.

### Styling
- Use Tailwind CSS utility classes exclusively — no component-scoped CSS files.
- Use the `cn()` helper from `@/lib/utils` to conditionally merge classes:
  ```ts
  import { cn } from "@/lib/utils";
  <div className={cn("base-class", isActive && "active-class")} />
  ```
- Dark mode is toggled via the `dark` class on a parent element (class-based strategy).
- All semantic colors are defined as CSS variables in `src/index.css` and referenced in Tailwind config (e.g. `bg-background`, `text-foreground`, `text-muted-foreground`). Use these tokens rather than raw color values.
- The Tailwind theme uses a CSS variable system for colors; do not hardcode HSL values directly in components.

### Routing
- Routes are defined in `src/App.tsx` using React Router v6 `<Routes>` and `<Route>`.
- Add new pages by: (1) creating the component in `src/pages/`, (2) adding a `<Route>` entry in `App.tsx`.

### Linting
- ESLint is configured with zero warnings allowed (`--max-warnings 0`). Fix all warnings before committing.
- Rules enforced: `eslint:recommended`, `@typescript-eslint/recommended`, `react-hooks/recommended`, `react-refresh`.
- Only export React components from component files (required by `react-refresh/only-export-components`).

---

## Testing

- **Framework:** Vitest (configured inside `vite.config.ts`, not a separate config file).
- **Environment:** JSDOM (browser-like DOM).
- **Globals:** `describe`, `it`, `expect`, `vi` are available without importing.
- **Setup:** `src/test/setup.ts` imports `@testing-library/jest-dom` matchers.
- **Pattern:** Use Testing Library (`render`, `screen`, `userEvent`) for component tests.

Example test:
```ts
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "../App";

describe("App", () => {
  it("renders the EasyMeasurement heading", () => {
    render(<App />);
    expect(screen.getByText("EasyMeasurement")).toBeInTheDocument();
  });
});
```

Place test files in `src/test/` or co-locate them as `ComponentName.test.tsx` beside the component.

---

## Tailwind Theme Reference

The theme extends Tailwind with CSS-variable-driven semantic color tokens. Use these in components:

| Token | Usage |
|---|---|
| `bg-background` / `text-foreground` | Page background and default text |
| `bg-card` / `text-card-foreground` | Card surfaces |
| `bg-primary` / `text-primary-foreground` | Primary action color |
| `bg-secondary` / `text-secondary-foreground` | Secondary/neutral color |
| `bg-muted` / `text-muted-foreground` | Subdued/placeholder content |
| `bg-accent` / `text-accent-foreground` | Highlight or hover state |
| `bg-destructive` / `text-destructive-foreground` | Danger/delete actions |
| `border-border` | Default border color |
| `rounded-lg` / `rounded-md` / `rounded-sm` | Theme-consistent border radius |

---

## Available Radix UI Primitives

The following Radix UI packages are already installed and ready to use:

`Accordion`, `AlertDialog`, `AspectRatio`, `Avatar`, `Checkbox`, `Collapsible`, `ContextMenu`, `Dialog`, `DropdownMenu`, `HoverCard`, `Label`, `Menubar`, `NavigationMenu`, `Popover`, `Progress`, `RadioGroup`, `ScrollArea`, `Select`, `Separator`, `Slider`, `Slot`, `Switch`, `Tabs`, `Toast`, `Toggle`, `ToggleGroup`, `Tooltip`

---

## Claude Code Integration

- **Session start hook** (`.claude/hooks/session-start.sh`): Automatically runs `npm install` when a Claude Code session starts, ensuring dependencies are always present.
- **Settings** (`.claude/settings.json`): Registers the `SessionStart` hook command.

---

## Git Workflow

- Main branch: `master`
- Feature/AI branches follow the pattern: `claude/<description>-<id>`
- Commit messages should be clear and imperative (e.g. "Add measurement input component").
- Always run `npm run lint` and `npm test` before committing.
