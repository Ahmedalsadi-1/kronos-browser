# KRON-DESKTOP FRONTEND

**Generated:** 2026-01-12
**Commit:** local-dev
**Branch:** local

## OVERVIEW
React frontend for kron-desktop application using NextUI components.

## STRUCTURE
```
kron-desktop/frontend/
├── src/
│   ├── components/      # UI components
│   │   ├── Chat/       # Chat interface
│   │   ├── Terminal/    # Terminal component
│   │   ├── Explorer/    # File explorer
│   │   └── ...         # Other UI components
│   ├── contexts/        # React contexts
│   ├── services/        # API services
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Utilities
│   ├── styles/         # Global styles
│   └── config/         # Config files
└── public/             # Static assets
```

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| Main app | src/ | Root App component |
| UI components | src/components/ | Chat, Terminal, Explorer, etc. |
| Contexts | src/contexts/ | Global state providers |
| Services | src/services/ | API clients, WebSocket |

## CONVENTIONS

### Package Manager
- pnpm (from .npmrc) or npm
- Use `pnpm install` or `npm install`

### Build System
- **Vite** for development server and builds
- React 19 + NextUI components

### Linting
- ESLint (eslint.config.js)
- Prettier (.prettierrc)

### NextUI
- `@nextui-org/*` component library
- `@react-aria/*` for accessibility
- `@react-stately/*` for state management

## COMMANDS
```bash
cd kron-desktop/frontend

# Install
pnpm install

# Development
pnpm run dev               # Vite dev server

# Build
pnpm run build             # Production build

# Quality
pnpm run lint             # ESLint check
```

## NOTES

### Backend Connection
Frontend connects to Express/NestJS backend (kron-desktop/backend/).

### NextUI Components
Use NextUI for consistent UI: Button, Input, Modal, etc.
