# BROWSEROS PROJECT KNOWLEDGE BASE

**Generated:** 2026-01-14
**Commit:** local-dev
**Branch:** local

## OVERVIEW
Chromium fork with AI-powered browser automation. Includes BrowserOS Agent (MCP server + Chrome extension), browser automation tools, and agent orchestration layer.

## STRUCTURE
```
BrowserOS/
├── packages/
│   ├── browseros-agent/    # Main monorepo (server, extensions, shared)
│   └── browseros/          # Browser application code
├── docs/                  # Documentation, images, videos
├── scripts/                # Utility scripts
└── signatures/             # Extension signatures
```

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| MCP server | packages/browseros-agent/apps/server/ | Hono HTTP server, agent loop |
| Agent UI | packages/browseros-agent/apps/agent/ | Chrome extension chat interface |
| Controller extension | packages/browseros-agent/apps/controller-ext/ | Chrome API bridge (tabs, history, bookmarks) |
| Shared constants | packages/browseros-agent/packages/shared/ | Ports, timeouts, limits, URLs, paths |
| Browser code | packages/browseros/ | Chromium browser application |

## CONVENTIONS

### BrowserOS-agent (Monorepo)
- **Package manager**: Bun (required, not npm/pnpm)
- **Import style**: No `.js` extensions (Bun resolves .ts)
- **File naming**: kebab-case for files/folders, PascalCase classes in code
- **Config**: Biome for linting (biome.json)
- **No index.ts**: Packages export directly from individual files
- **Shared constants**: Use `@browseros/shared/constants/*` (ports, timeouts, limits, urls, paths)

### Monorepo Structure
- **apps/**: Main applications (server, agent, controller-ext)
- **packages/**: Shared libraries (shared)
- **No barrel exports**: Each file exports independently, no index.ts bundling

### MCP Tool Organization
- **cdp-based/**: Tools using Chrome DevTools Protocol directly
- **controller-based/**: Tools using browser extension via WebSocket

## ANTI-PATTERNS (THIS PROJECT)

### BrowserOS-agent
- **NEVER** use `.js` extension in imports
- **NEVER** add `[prefix]` tags to logger messages (file:line added automatically)
- **ALWAYS** import shared constants from `@browseros/shared/*`
- **DEPRECATED** CLI args: `--controller-port`, `--port` (use `--server-port`)
- **FIXME**: Race condition in controller-bridge.ts (window_created event timing)

### Monorepo
- **NEVER** create index.ts barrel files (inflates bundle)
- **NEVER** use npm/pnpm (Bun only)

## COMMANDS

### BrowserOS-agent Development
```bash
cd BrowserOS/packages/browseros-agent

# Install
bun install

# Start (development)
bun run start:server            # Load .env.dev automatically
bun run start:agent             # Start agent extension
bun run start:controller         # Start controller extension

# Build
bun run build:server            # Build server for production
bun run build:ext              # Build extensions for production
bun run dist:server             # All production targets
bun run dist:ext               # All extension targets

# Test
bun run test                   # Controller-based and common tests
bun run test:cdp              # CDP-based tests (requires browser)
bun run test:controller         # Controller-based tests only
bun run test:integration        # Integration tests
bun run test:all              # All tests

# Lint/Typecheck
bun run lint                   # Biome check
bun run lint:fix               # Auto-fix with Biome
bun run typecheck              # TypeScript build check
```

### Documentation Workflow
When updating docs with screenshots:
```bash
# Copy image to clipboard (Cmd+C)
python scripts/save_clipboard.py docs/images/agent-step.png
```

## NOTES

### Port Configuration
Ports must be synced between server and extension .env files:

| Port | Env Variable | Purpose |
|------|--------------|---------|
| 9100 | `BROWSEROS_SERVER_PORT` | HTTP server (MCP, chat, health) |
| 9000 | `BROWSEROS_CDP_PORT` | Chromium CDP connection |
| 9300 | `BROWSEROS_EXTENSION_PORT` | WebSocket for extension |

### Architecture
```
MCP Client (claude-code, Agent UI)
       ↓ HTTP/SSE
BrowserOS Server (port 9100)
       ↓
  ┌────┴────┐
CDP          WebSocket (port 9300)
(port 9000)      ↓
         BrowserOS Controller Extension (chrome.* APIs)
```

### Shared Constants Structure
- `@browseros/shared/constants/ports` - Port numbers
- `@browseros/shared/constants/timeouts` - Timeout values
- `@browseros/shared/constants/limits` - Rate limits, pagination, content limits
- `@browseros/shared/constants/urls` - External service URLs
- `@browseros/shared/constants/paths` - File system paths

### Package Exports Pattern
```json
"exports": {
  "./constants/ports": {
    "types": "./src/constants/ports.ts",
    "default": "./src/constants/ports.ts"
  }
}
```
