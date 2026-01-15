# BROWSEROS-AGENT MONOREPO

**Generated:** 2026-01-14
**Commit:** local-dev
**Branch:** local

## OVERVIEW
Bun-based MCP server for intelligent browser automation. Chrome extension bridge enables browser control from external AI tools (claude-code, gemini-cli). Includes agent loop, CDP-based tools, and controller-based tools.

## STRUCTURE
```
browseros-agent/
├── apps/
│   ├── server/           # Bun MCP server (port 9100)
│   ├── agent/            # Agent UI Chrome extension (chat interface)
│   └── controller-ext/   # BrowserOS Controller extension (chrome.* APIs)
└── packages/
    └── shared/           # Shared constants and types
```

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| MCP endpoints | apps/server/src/http/ | Hono routes (MCP, chat, health) |
| CDP tools | apps/server/src/tools/cdp-based/ | Console, network, emulation, input |
| Controller tools | apps/server/src/tools/controller-based/ | Navigation, clicks, tabs, history |
| Agent orchestration | apps/server/src/agent/ | Agent loop, rate limiting, sessions |
| Controller bridge | apps/server/src/controller-server/ | WebSocket to extension |
| Agent actions | apps/agent/entrypoints/ | Chrome extension UI handlers |
| Controller actions | apps/controller-ext/src/actions/ | Browser API adapters |
| Shared constants | packages/shared/src/constants/ | Ports, timeouts, limits |

## CONVENTIONS

### Bun Preferences
- Use `bun <file>` instead of `node <file>`
- Use `bun test` instead of `jest` or `vitest`
- Use `bun install` instead of `npm install`
- Bun auto-loads .env (no dotenv needed)

### Import Style
- **No `.js` extensions**: Bun resolves `.ts` automatically
- **Correct**: `import { foo } from './utils'`
- **Wrong**: `import { foo } from './utils.js'`

### File Naming
| Type | Convention | Example |
|------|------------|---------|
| Multi-word files | kebab-case | `gemini-agent.ts`, `mcp-context.ts` |
| Single-word files | lowercase | `types.ts`, `index.ts` |
| Test files | `.test.ts` suffix | `mcp-context.test.ts` |
| Folders | kebab-case | `controller-server/`, `rate-limiter/` |

Classes use PascalCase in code, but live in kebab-case files.

### Logger Messages
- No `[prefix]` tags (e.g., `[Config]`, `[HTTP Server]`)
- Source tracking auto-adds file:line:function in dev mode

### Shared Constants
Avoid magic numbers. Use `@browseros/shared`:
- `@browseros/shared/constants/ports` - Port numbers
- `@browseros/shared/constants/timeouts` - Timeout values
- `@browseros/shared/constants/limits` - Rate limits, content limits
- `@browseros/shared/constants/urls` - External service URLs
- `@browseros/shared/constants/paths` - File system paths

## ANTI-PATTERNS (THIS PROJECT)

### Import Style
- **NEVER** use `.js` extensions in imports
- **ALWAYS** use extensionless imports

### Logger Messages
- **NEVER** add `[prefix]` tags to logger messages

### Constants
- **NEVER** scatter magic constants in codebase
- **ALWAYS** use `@browseros/shared/constants/*`

### Package Structure
- **NEVER** create `index.ts` barrel files (inflates bundle)
- **ALWAYS** export from individual files

### CLI Arguments
- **DEPRECATED**: `--controller-port`, `--port`
- **USE**: `--server-port` instead

### Race Conditions
- **FIXME**: controller-bridge.ts window_created event timing race

## COMMANDS

### Development
```bash
# Environment
cp apps/server/.env.example apps/server/.env.development
cp apps/agent/.env.example apps/agent/.env.development

# Start
bun run start:server            # Server (loads .env.dev)
bun run start:agent             # Agent UI extension

# Build
bun run dev:server             # Development build
bun run dist:server            # Production build
bun run dev:ext               # Extension dev build
bun run dist:ext              # Extension prod build

# Test
bun run test                   # Standard tests
bun run test:cdp              # CDP tests (requires browser)
bun run test:controller         # Controller tests only
bun run test:integration        # Integration tests
bun run test:all              # All tests

# Quality
bun run lint                   # Biome check
bun run lint:fix               # Auto-fix
bun run typecheck              # TypeScript check

# Single test file
bun --env-file=.env.dev test apps/server/tests/path/to/file.test.ts
```

## NOTES

### Tool Types
- **CDP tools**: Require direct CDP connection (--cdp-port 9000)
- **Controller tools**: Work via browser extension over WebSocket (port 9300)

### Communication Flow
```
AI Agent/MCP Client
       ↓ HTTP/SSE
BrowserOS Server (Hono)
       ↓
  ┌────┴────┐
CDP          WebSocket
(9000)       (9300)
  ↓            ↓
Chromium    Controller Extension
CDP API    chrome.* APIs
```

### Package Exports
```json
"exports": {
  "./constants/ports": {
    "types": "./src/constants/ports.ts",
    "default": "./src/constants/ports.ts"
  },
  "./types/logger": {
    "types": "./src/types/logger.ts",
    "default": "./src/types/logger.ts"
  }
}
```

### Test Organization
- `apps/server/tests/tools/cdp-based/` - Tests requiring CDP
- `apps/server/tests/tools/controller-based/` - Mocked controller context
- `apps/server/tests/common/` - Shared utilities
- `apps/server/tests/__helpers__/` - Test fixtures

### Creating New Packages
- Location: `packages/` (not `apps/`)
- No `index.ts`: Keep exports in individual files
- Import pattern: `import { X } from "@package/name/file"`
