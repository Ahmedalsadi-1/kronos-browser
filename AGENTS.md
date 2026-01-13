# KRONOS-OS PROJECT KNOWLEDGE BASE

**Generated:** 2026-01-12
**Commit:** local-dev
**Branch:** local

## OVERVIEW
Multi-project monorepo containing 4 independent products: BrowserOS-agent (browser automation MCP server), void (VS Code fork with AI features), kron-desktop (desktop app), kronbot (agent orchestration). All use TypeScript; void includes Rust CLI. Uses Bun, pnpm, npm.

## STRUCTURE
```
./
├── BrowserOS-agent/    # Bun MCP server for browser automation
├── void/               # VS Code fork with AI/chat features
├── kron-desktop/        # Desktop application (frontend + backend)
└── kronbot/            # Agent orchestration platform
```

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| Browser automation | BrowserOS-agent/ | MCP tools, Chrome extension bridge |
| Editor AI features | void/src/vs/workbench/contrib/ | void/ = custom features, chat/ = AI integration |
| Desktop app UI | kron-desktop/frontend/ | React + NextUI components |
| Desktop app server | kron-desktop/backend/ | Express/NestJS API |
| Agent orchestration | kronbot/packages/bytebot-ui/ | Web UI for agent management |

## CONVENTIONS

### BrowserOS-agent
- **Package manager**: Bun (required, not npm/pnpm)
- **Import style**: No `.js` extensions (Bun resolves .ts)
- **File naming**: kebab-case for files/folders, PascalCase classes in code
- **Config**: Biome for linting (biome.json)
- **No index.ts**: Packages export directly from individual files
- **Shared constants**: Use `@browseros/shared/constants/*` (ports, timeouts, limits, urls, paths)

### void (VS Code fork)
- **Build system**: Gulp + Webpack (not Vite/turbopack)
- **Layers**: common → browser → electron-sandbox → node → electron-utility → electron-main
- **Module boundary**: Strict import layering enforced by ESLint (local/code-layering)
- **Multi-window**: Always use `DOM.getWindow(element)` or `DOM.getActiveWindow()` before `document`, `window`
- **No globals**: Forbidden in ESM: `__dirname`, `__filename`, `require` (use `fileURLToPath`)
- **Terminal vars**: Private `_`, protected no prefix, public camelCase or UPPER_CASE
- **ESM**: All TS files are ESM modules

### kron-desktop
- **Frontend**: React + Vite + NextUI
- **Backend**: Express + NestJS
- **Package manager**: pnpm (from .npmrc) or npm
- **Linting**: ESLint + Prettier (.prettierrc)

### kronbot
- **Package manager**: npm or pnpm
- **Monorepo**: packages/ structure

## ANTI-PATTERNS (THIS REPO)

### BrowserOS-agent
- **NEVER** use `.js` extension in imports
- **NEVER** add `[prefix]` tags to logger messages (file:line added automatically)
- **ALWAYS** import shared constants from `@browseros/shared/*`
- **DEPRECATED** CLI args: `--controller-port`, `--port` (use `--server-port`)
- **FIXME**: Race condition in controller-bridge.ts (window_created event timing)

### void
- **NEVER** access `document`, `window` directly (use `DOM.getWindow()` / `DOM.getActiveWindow()`)
- **NEVER** use global `window.addEventListener` (use `<targetWindow>.addEventListener()`)
- **NEVER** use `require()`, `__dirname`, `__filename` (ESM forbidden)
- **NEVER** import node modules in browser layer
- **ALWAYS** follow layering: common → browser → electron-sandbox → node → electron-utility → electron-main
- **RESTRICTED** globals: `name`, `length`, `event`, `closed`, `external`, `status`, `origin`, `orientation`, `context`
- **NO HEADER**: void/ code removes Microsoft header requirement

## COMMANDS

### BrowserOS-agent
```bash
cd BrowserOS-agent
bun install                    # Install dependencies
bun run start:server            # Start MCP server (port 9100)
bun run build:server            # Build for production
bun run test                   # Run tests
bun run lint                   # Biome check
bun run lint:fix               # Auto-fix with Biome
```

### void
```bash
cd void
npm install                     # Install (uses custom preinstall script)
npm run compile                 # Gulp compile
npm run watch-client            # Watch and rebuild client
npm run watch-extensions        # Watch and rebuild extensions
npm run eslint                 # Run ESLint
npm run smoketest              # Run smoke tests
```

### kron-desktop
```bash
cd kron-desktop/frontend    # or kron-desktop/backend
pnpm install                   # or npm install
pnpm run dev                   # Vite dev server
pnpm run build                 # Production build
pnpm run lint                 # ESLint check
```

### kronbot
```bash
cd kronbot
npm install                     # or pnpm install
# See individual package.json for scripts
```

## NOTES

### Port Conflicts
- BrowserOS-agent: server (9100), CDP (9000), controller (9300)
- These must match between server and agent .env files

### void Layering
- `/~` pattern in ESLint config expands to all layer variants (common, browser, electron-*, test/*)
- Import restrictions enforced by `local/code-import-patterns` rule

### BrowserOS-agent Architecture
- MCP tools split into: cdp-based/ (direct CDP) and controller-based/ (via WebSocket)
- Controller-ext Chrome extension bridges chrome.* APIs to server over WebSocket
- Gemini AI adapter in agent/ (LLM provider)
