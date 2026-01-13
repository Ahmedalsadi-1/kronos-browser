# BYTEBOT-UI - AGENT ORCHESTRATION WEB UI

**Generated:** 2026-01-12
**Commit:** local-dev
**Branch:** local

## OVERVIEW
Web UI for agent management in kronbot. Next.js application for monitoring and controlling agents.

## STRUCTURE
```
kronbot/packages/bytebot-ui/
├── src/
│   ├── app/              # Next.js app router
│   ├── components/       # UI components
│   │   └── ui/        # Base UI components
│   ├── constants/        # Constants
│   ├── types/           # TypeScript types
│   └── utils/           # Utilities
└── public/              # Static assets
```

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| Main app | src/app/ | Next.js app routes |
| Agent dashboard | src/app/desktop | Desktop view |
| API routes | src/app/api/ | API endpoints |
| UI components | src/components/ | Reusable components |

## CONVENTIONS

### Next.js
- **App Router** (`src/app/`) - directory-based routing
- **Server Components** by default
- **Dynamic routes**: `[id]`, `[[...path]]`

### TypeScript
- Strict mode enabled
- Types in `src/types/`

## COMMANDS
```bash
cd kronbot/packages/bytebot-ui

# Install
npm install                  # or pnpm install

# Development
npm run dev                # Next.js dev server

# Build
npm run build              # Production build

# Quality
npm run lint              # ESLint check (if configured)
```

## NOTES

### Monorepo
Part of kronbot monorepo - uses shared packages from `kronbot/packages/shared/`.
