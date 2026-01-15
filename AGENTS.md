# KRONOS-OS PROJECT KNOWLEDGE BASE

**Generated:** 2026-01-14
**Commit:** local-dev
**Branch:** local

## OVERVIEW
Multi-project monorepo containing 4 independent products: BrowserOS (Chromium fork with AI agents), Kronos-browser (Zen Browser fork), kronbot (desktop AI agent orchestration), and EdgyArc-fr (Arc-like browser). Uses TypeScript (BrowserOS, kronbot), JavaScript (Kronos-browser), and Rust/Bun runtimes.

## STRUCTURE
```
./
├── BrowserOS/            # Chromium fork with AI agents + MCP server
├── kronos-browser/       # Zen Browser fork (Firefox-based)
├── kronbot/             # AI desktop agent orchestration platform
├── EdgyArc-fr/          # Arc-like browser features
└── website/             # Project website
```

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| Browser automation | BrowserOS/packages/browseros-agent/ | MCP server, Chrome extension bridge |
| Browser engine | kronos-browser/engine/ | Firefox (SpiderMonkey, Gecko) |
| Desktop AI agent | kronbot/packages/ | NestJS services, virtual desktop |
| Zen UI/UX | kronos-browser/src/zen/ | Zen-specific browser features |
| Build configs | Various | BrowserOS (Bun), kronos-browser (mach), kronbot (npm/pnpm) |

## CONVENTIONS

### BrowserOS (Chromium Fork)
- **Package manager**: Bun (required, not npm/pnpm)
- **Import style**: No `.js` extensions (Bun resolves .ts)
- **File naming**: kebab-case for files/folders, PascalCase classes
- **Config**: Biome for linting (biome.json)
- **Shared constants**: Use `@browseros/shared/constants/*` (ports, timeouts, limits, urls, paths)
- **No index.ts**: Packages export directly from individual files

### kronos-browser (Firefox Fork)
- **Build system**: `./mach` (Mozilla build system, never use subdirectories)
- **Comment style**: Minimal comments (only for non-trivial code)
- **Search**: Use `searchfox-cli` for Firefox code (not grep/rg)
- **Workflow**: format → lint → build → test (via `./mach` commands)
- **No commits**: Do not perform commits yourself
- **Emoji forbidden**: Style guide prohibits emoji

### kronbot (AI Desktop Agent)
- **Package manager**: npm or pnpm
- **Monorepo**: packages/ structure with local dependencies
- **Prisma**: Requires `npx prisma generate` on build
- **NestJS**: Modules per domain, DTOs in dto/ subdirs, WebSocket gateways
- **Next.js**: App Router, Tailwind CSS 4 (CSS-first, no tailwind.config.js)

## ANTI-PATTERNS (THIS REPO)

### BrowserOS
- **NEVER** use `.js` extension in imports
- **NEVER** add `[prefix]` tags to logger messages (file:line added automatically)
- **ALWAYS** import shared constants from `@browseros/shared/*`
- **DEPRECATED** CLI args: `--controller-port`, `--port` (use `--server-port`)
- **FIXME**: Race condition in controller-bridge.ts (window_created event timing)

### kronos-browser
- **NEVER** build with subdirectories (always use `./mach build`)
- **NEVER** use emoji in code
- **NEVER** add excessive comments
- **ALWAYS** use `searchfox-cli` for Firefox code searches
- **NEVER** perform git commits yourself

### kronbot
- **NEVER** build dependent packages before shared (always build shared first)
- **NEVER** skip Prisma generation (required for type safety)
- **NEVER** modify schema directly (use Prisma migrations)
- **NEVER** skip input tracking (required for human takeover)

## COMMANDS

### BrowserOS
```bash
cd BrowserOS/packages/browseros-agent
bun install
bun run start:server            # Start MCP server (port 9100)
bun run build:server            # Build for production
bun run test                   # Run tests
bun run lint                   # Biome check
bun run lint:fix               # Auto-fix with Biome
```

### kronos-browser
```bash
cd kronos-browser/engine
./mach build                    # Build entire engine (never use subdirs)
./mach lint                    # Lint modified files
./mach format                  # Format modified files
./mach test --auto             # Run tests
./mach run                     # Run browser
```

### kronbot
```bash
cd kronbot
# Monorepo root
cd docker && docker-compose up -d

# Individual packages
cd packages/bytebot-ui && npm run dev
cd packages/bytebot-agent && npm run start:dev
cd packages/shared && npm run build
```

## NOTES

### Port Conflicts
- **BrowserOS**: server (9100), CDP (9000), controller (9300) - must sync between server and extension .env
- **kronbot**: bytebotd (9990), bytebot-agent (9991), bytebot-ui (9992), PostgreSQL (5432)

### Project Specifics

#### BrowserOS Architecture
- MCP tools split into: cdp-based/ (direct CDP) and controller-based/ (via WebSocket)
- Controller-ext Chrome extension bridges chrome.* APIs to server over WebSocket
- Gemini AI adapter in agent/ (LLM provider)

#### kronos-browser Searchfox
- Searchfox CLI for finding Firefox code definitions
- Use `@moz:bugzilla://` and `@moz:phabricator://` MCP resources
- Only index merged/public code (use rg for local changes)

#### kronbot Dependencies
- All packages depend on `@bytebot/shared` via local `"file:../shared"`
- Prisma generates database client on build
- Desktop environment: Ubuntu 22.04 with XFCE, noVNC access

### Build Patterns
- **BrowserOS**: Bun monorepo, Biome for linting, separate .env files per package
- **kronos-browser**: Mozilla mach build system, C++ (SpiderMonkey, Gecko), ESLint for JS
- **kronbot**: NestJS (backend), Next.js (UI), Prisma (DB), Docker/Kubernetes (deploy)
