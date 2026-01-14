# BYTEBOT-AGENT-CC - COMPUTER CONTROL AGENT

**Generated:** 2026-01-13
**Commit:** local-dev
**Branch:** local

## OVERVIEW
Computer control agent with nut.js integration. Specialized NestJS service for desktop automation tasks. Smaller, focused version of bytebot-agent.

## STRUCTURE
```
bytebot-agent-cc/src/
├── agent/                 # Agent core
│   └── agent.processor.ts  # Agent logic
├── tasks/                # Task management
│   └── tasks.service.ts
└── nut/                  # @nut-tree-fork/nut-js
    └── nut.service.ts    # Desktop automation
```

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| Agent core | src/agent/agent.processor.ts | Main agent logic |
| Task service | src/tasks/tasks.service.ts | Task handling |
| Nut.js wrapper | src/nut/nut.service.ts | Desktop control |

## CONVENTIONS

### Simplified Architecture
- **No database**: Direct task handling without persistence
- **No WebSocket**: REST-only communication
- **Focused scope**: Computer control only

### Nut.js Integration
- **Wrapper service**: All desktop actions through `nut.service.ts`
- **Relative positioning**: Avoid hard-coded coordinates

## COMMANDS
```bash
cd packages/bytebot-agent-cc

# Development
npm run start:dev          # Builds shared + NestJS dev mode

# Production
npm run build             # Builds shared + NestJS build
npm run start:prod        # Production mode

# Quality
npm run lint              # ESLint with auto-fix
```

## ANTI-PATTERNS

### Build Order
- **ALWAYS build shared first**: Required dependency

## NOTES

### Differences from bytebot-agent
- **No Prisma**: No database, no migrations
- **No WebSocket**: Simpler, REST-only
- **Single provider**: Focus on computer control
