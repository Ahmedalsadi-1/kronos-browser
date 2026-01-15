# BYTEBOTD - DESKTOP DAEMON

**Generated:** 2026-01-13
**Commit:** local-dev
**Branch:** local

## OVERVIEW
NestJS desktop daemon service. Provides computer control API, mouse/keyboard input tracking (human takeover), MCP tool integration, and noVNC desktop viewing.

## STRUCTURE
```
bytebotd/src/
├── computer-use/          # Desktop control REST API
│   ├── computer-use.service.ts
│   ├── computer-use.controller.ts
│   └── dto/             # Action DTOs
├── input-tracking/        # Human input capture
│   ├── input-tracking.service.ts
│   ├── input-tracking.gateway.ts
│   └── input-tracking.controller.ts
├── mcp/                  # Model Context Protocol
│   ├── mcp/            # MCP server
│   └── computer-use.tools.ts # MCP tool definitions
└── nut/                  # @nut-tree-fork/nut-js wrapper
    └── nut.service.ts    # Mouse/keyboard/screen control
```

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| Desktop control API | src/computer-use/ | REST endpoints for actions |
| Input tracking | src/input-tracking/ | Mouse/keyboard WebSocket |
| MCP tools | src/mcp/ | Computer use tools |
| Nut.js integration | src/nut/ | Desktop automation wrapper |

## CONVENTIONS

### Module Organization
- **One module per domain**: computer-use, input-tracking, mcp, nut
- **DTOs**: Validation pipes in `dto/` subdirectory
- **Gateways**: WebSocket for real-time input tracking
- **Controllers**: REST endpoints for desktop actions

### Desktop Automation
- **Nut.js wrapper**: All desktop actions through `nut.service.ts`
- **No hard-coded coordinates**: Use relative positioning when possible
- **Input tracking required**: Human takeover needs mouse/keyboard events

### MCP Integration
- **Tool export**: Computer-use tools in `mcp/computer-use.tools.ts`
- **MCP module**: `bytebot-mcp.module.ts` for MCP server

## COMMANDS
```bash
cd packages/bytebotd

# Development
npm run start:dev          # Builds shared + runs NestJS dev mode

# Production
npm run build             # Builds shared + NestJS build
npm run start:prod        # Runs production mode

# Testing
npm run test             # Jest unit tests
npm run test:e2e          # End-to-end tests

# Quality
npm run lint              # ESLint with auto-fix
```

## ANTI-PATTERNS

### Input Tracking
- **NEVER skip input tracking**: Human takeover requires mouse/keyboard events via WebSocket
- **NEVER assume screen coordinates**: Desktop environment may vary

### Build Order
- **ALWAYS build shared first**: `npm run build --prefix ../shared` before building bytebotd

## NOTES

### Service Port
- **9990**: Desktop daemon (REST API + noVNC + input tracking WebSocket)

### Desktop Environment
- Runs inside Ubuntu 22.04 container with XFCE desktop
- noVNC provides web-based VNC access at http://localhost:9990

### Input Tracking
`input-tracking.gateway.ts` streams mouse/keyboard events from physical hardware to enable human takeover detection.
