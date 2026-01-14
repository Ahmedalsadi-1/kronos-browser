# BYTEBOT-UI - WEB INTERFACE

**Generated:** 2026-01-13
**Commit:** local-dev
**Branch:** local

## OVERVIEW
Next.js web UI for agent orchestration and desktop viewing. Task management, real-time desktop monitoring, WebSocket-based communication with agent services.

## STRUCTURE
```
bytebot-ui/
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── desktop/          # Desktop viewer (VNC)
│   │   ├── tasks/            # Task management pages
│   │   └── api/             # API routes
│   ├── components/
│   │   ├── ui/              # Radix UI primitives
│   │   └── messages/        # Message display components
│   └── utils/              # Utility functions
└── server.ts               # Custom Express + Socket.IO server
```

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| Main app | src/app/page.tsx | Landing page |
| Task list | src/app/tasks/page.tsx | Task management UI |
| Task detail | src/app/tasks/[id]/page.tsx | Individual task view |
| Desktop view | src/app/desktop/page.tsx | noVNC integration |
| UI components | src/components/ui/ | Radix UI base components |
| API proxy | server.ts | Socket.IO proxy to agent |

## CONVENTIONS

### Next.js App Router
- **Directory-based routing**: `src/app/tasks/[id]/page.tsx`
- **Server Components**: Default, use `use client` for interactive components
- **Dynamic routes**: `[id]` for task details

### Shared Dependencies
- **Must build shared first**: `npm run build --prefix ../shared` before dev/build
- **Import**: `@bytebot/shared` for types

### Styling
- **Tailwind CSS 4**: CSS-first, no tailwind.config.js
- **Radix UI**: Base primitives in `components/ui/`
- **Motion library**: Framer Motion alternative for animations

## COMMANDS
```bash
cd packages/bytebot-ui

# Development
npm run dev                  # Builds shared + starts dev server (port 3000)

# Production
npm run build                # Builds shared + Next.js build
npm run start               # Starts custom Express server

# Quality
npm run lint                # ESLint check
```

## NOTES

### Server Mode
Custom Express server (`server.ts`) proxies Socket.IO to agent services. Required for real-time updates.

### Monorepo Context
Shares types from `@bytebot/shared`. Build order matters: shared → bytebot-ui.
