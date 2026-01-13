# BROWSEROS-AGENT PROJECT KNOWLEDGE BASE

**Generated:** 2026-01-12
**Commit:** local-dev
**Branch:** local

## OVERVIEW
Bun-based MCP server for browser automation with Chrome extension bridge. Monorepo with 3 apps + 1 shared package.

## STRUCTURE
```
BrowserOS-agent/
├── apps/
│   ├── server/           # Bun MCP server + agent loop
│   ├── agent/            # Agent UI (Chrome extension, wxt.dev)
│   └── controller-ext/   # BrowserOS Controller (Chrome extension)
└── packages/
    └── shared/          # Shared constants, types
```

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| MCP tools | apps/server/src/tools/ | Split: cdp-based/ (direct CDP), controller-based/ (via extension) |
| Agent loop | apps/server/src/agent/ | Gemini adapter, rate limiting, sessions |
| Controller bridge | apps/server/src/controller-server/ | WebSocket server for extension |
| Agent UI | apps/agent/entrypoints/ | New tab, popup, onboarding |
| Shared constants | packages/shared/src/constants/ | Ports, timeouts, limits, urls, paths |

## CONVENTIONS

### Import Style
- **NEVER** use `.js` extensions in imports (Bun resolves `.ts`)
```typescript
// ✅ Correct
import { foo } from './utils'
import type { Bar } from '../types'

// ❌ Wrong
import { foo } from './utils.js'
```

### File Naming
- Files/folders: kebab-case (`gemini-agent.ts`, `mcp-context.ts`)
- Classes: PascalCase in code
- Tests: `.test.ts` suffix

### Shared Constants
Use `@browseros/shared/constants/*` for all shared config:
- `@browseros/shared/constants/ports` - Port numbers (DEFAULT_PORTS, TEST_PORTS)
- `@browseros/shared/constants/timeouts` - Timeout values (TIMEOUTS)
- `@browseros/shared/constants/limits` - Rate limits, pagination (RATE_LIMITS, AGENT_LIMITS)
- `@browseros/shared/constants/urls` - External service URLs (EXTERNAL_URLS)
- `@browseros/shared/constants/paths` - File system paths (PATHS)

### Package Exports
- **NO index.ts** - Inflates bundle, individual file exports preferred
```json
"exports": {
  "./constants/ports": {
    "types": "./src/constants/ports.ts",
    "default": "./src/constants/ports.ts"
  }
}
```

## ANTI-PATTERNS (THIS PROJECT)

- **NEVER** use `.js` extension in imports
- **NEVER** add `[prefix]` tags to logger messages (file:line:function added automatically)
- **NEVER** scatter magic constants - use `@browseros/shared/constants/*`
- **DEPRECATED** CLI args: `--controller-port`, `--port` (use `--server-port`)
- **FIXME** (Race condition): `controller-bridge.ts` window_created event timing

## COMMANDS
```bash
cd BrowserOS-agent

# Setup
bun install
cp apps/server/.env.example apps/server/.env.development
cp apps/agent/.env.example apps/agent/.env.development

# Development
bun run start:server          # Start MCP server (port 9100)
bun run start:agent           # Start agent extension dev mode

# Build
bun run build:server          # Build server production
bun run build:agent           # Build agent extension
bun run build:ext             # Build controller extension

# Test
bun run test                  # Standard tests
bun run test:cdp              # CDP-based tests (requires CDP connection)
bun run test:controller       # Controller-based tests
bun run test:integration      # Integration tests

# Quality
bun run lint                  # Biome check
bun run lint:fix              # Biome auto-fix
bun run typecheck             # TypeScript build check
```

## NOTES

### Ports
| Port | Env Variable | Purpose |
|------|--------------|---------|
| 9100 | `BROWSEROS_SERVER_PORT` | HTTP server (MCP, chat, health) |
| 9000 | `BROWSEROS_CDP_PORT` | Chromium CDP (server connects as client) |
| 9300 | `BROWSEROS_EXTENSION_PORT` | WebSocket for controller extension |

### Architecture
```
MCP Clients → HTTP Server (Hono) → Tool Handler
                                         ↓
           CDP (client) ←── or ──→ WebSocket → Extension → Chrome APIs
```

### Tool Types
- **CDP tools**: Require direct CDP connection (console, network, input, screenshot, emulation)
- **Controller tools**: Work via browser extension (navigation, clicks, tabs, bookmarks, history)

### WXT Framework
- `apps/agent` uses wxt.dev for Chrome extension building
- Manifest generated via default wxt setup + `wxt.config.ts` custom config
- Entry points: newtab/, popup/, onboarding/
