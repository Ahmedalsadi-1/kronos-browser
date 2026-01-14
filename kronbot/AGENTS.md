# KRONBOT - AI DESKTOP AGENT ORCHESTRATION

**Generated:** 2026-01-13
**Commit:** local-dev
**Branch:** local

## OVERVIEW
Open-source AI desktop agent with virtual Linux desktop environment. Orchestrates AI (Anthropic/OpenAI/Gemini) to control desktop applications, browse the web, process documents, and complete multi-step workflows autonomously.

## STRUCTURE
```
kronbot/
├── packages/
│   ├── bytebot-ui/       # Next.js web UI (task management, desktop view)
│   ├── bytebot-agent/     # NestJS AI agent service (orchestration, LLM coordination)
│   ├── bytebotd/         # NestJS desktop daemon (computer control, input tracking)
│   ├── bytebot-agent-cc/  # Computer control agent (nut.js integration)
│   ├── bytebot-llm-proxy/ # LLM provider proxy (LiteLLM integration)
│   └── shared/           # Shared types and utilities
├── docker/               # Docker Compose deployment
├── helm/                # Kubernetes Helm charts
└── docs/                # Documentation
```

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| Web UI | packages/bytebot-ui/src/app/ | Next.js App Router |
| Task management | packages/bytebot-agent/src/tasks/ | Task CRUD, WebSocket gateway |
| AI orchestration | packages/bytebot-agent/src/agent/ | Agent processor, scheduler, computer use |
| Desktop control | packages/bytebotd/src/computer-use/ | REST API for computer actions |
| Input tracking | packages/bytebotd/src/input-tracking/ | Mouse/keyboard capture, WebSocket |
| LLM providers | packages/bytebot-agent/src/{anthropic,openai,google}/ | Provider-specific services/tools |
| MCP integration | packages/bytebotd/src/mcp/ | Model Context Protocol tools |
| Shared types | packages/shared/src/ | Cross-package interfaces |

## CONVENTIONS

### Build Dependencies
- **Shared package must build first**: All packages depend on `@bytebot/shared`, run `npm run build --prefix ../shared` before building other packages
- **Prisma generation**: bytebot-agent runs `npx prisma generate` on build (required for database client)

### NestJS Services
- **Module organization**: One module per domain (agent, tasks, messages, computer-use, etc.)
- **DTOs**: Each module has `dto/` subdirectory for data transfer objects
- **Gateways**: WebSocket gateways in `*.gateway.ts` (e.g., `tasks.gateway.ts`)
- **Controllers**: REST controllers in `*.controller.ts`

### Next.js UI
- **App Router**: All routes in `src/app/` (e.g., `tasks/[id]/page.tsx`)
- **UI components**: Base components in `src/components/ui/` (Radix UI primitives)
- **Server mode**: Custom server in `server.ts` (Express + Socket.IO proxy)
- **Tailwind CSS 4**: New CSS-first approach, no tailwind.config.js

### AI Provider Integration
- **Tools pattern**: Each LLM provider has `*.tools.ts` exporting tool functions
- **Constants**: Provider-specific config in `*.constants.ts`
- **Adapter pattern**: Abstract LLM calls through provider-specific services

## ANTI-PATTERNS (THIS PROJECT)

### Build System
- **NEVER build dependent packages before shared**: Always build `packages/shared` first
- **NEVER skip Prisma generation**: bytebot-agent requires `npx prisma generate` for type safety

### Database
- **NEVER modify schema directly**: Use Prisma migrations (`npx prisma migrate dev`)
- **NEVER access Prisma client without module**: Use `PrismaService` dependency injection

### Desktop Control
- **NEVER skip input tracking**: Human takeover requires mouse/keyboard events via WebSocket
- **NEVER assume screen coordinates**: Desktop environment may vary (use relative positioning)

## COMMANDS

### Root (Monorepo)
```bash
# Docker Compose deployment
cd docker
docker-compose -f docker-compose.yml up -d

# Access services
# UI: http://localhost:9992
# Desktop (noVNC): http://localhost:9990
# Agent API: http://localhost:9991
```

### bytebot-ui
```bash
cd packages/bytebot-ui
npm install                    # or pnpm install
npm run dev                    # Next.js dev server (port 3000)
npm run build                  # Production build
npm run start                  # Custom server (Express + Socket.IO proxy)
npm run lint                   # ESLint check
```

### bytebot-agent
```bash
cd packages/bytebot-agent
npm install
npm run start:dev              # NestJS dev mode with watch
npm run build                  # Build shared + prisma generate + NestJS build
npm run start:prod             # Production mode with Prisma migrations
npm run prisma:dev            # Run Prisma migrations
npm run lint                   # ESLint with auto-fix
npm run test                   # Jest unit tests
npm run test:e2e              # End-to-end tests
```

### bytebotd
```bash
cd packages/bytebotd
npm install
npm run start:dev              # NestJS dev mode
npm run build                  # Build shared + NestJS build
npm run start:prod             # Production mode
npm run lint                   # ESLint with auto-fix
npm run test                   # Jest unit tests
```

### shared
```bash
cd packages/shared
npm install
npm run build                  # TypeScript compilation to dist/
npm run lint                   # ESLint check
```

## NOTES

### Service Ports
- **9990**: bytebotd (desktop control + noVNC)
- **9991**: bytebot-agent (AI agent API)
- **9992**: bytebot-ui (web UI)
- **5432**: PostgreSQL (internal)

### Monorepo Architecture
- **No root package.json**: Each package has its own package.json
- **Local dependency**: `@bytebot/shared` imported via `"file:../shared"` path
- **Independent deployments**: Each service can run in its own container

### LLM Provider Configuration
Set one environment variable per provider:
- `ANTHROPIC_API_KEY` for Claude
- `OPENAI_API_KEY` for GPT
- `GEMINI_API_KEY` for Gemini

### Desktop Environment
- **OS**: Ubuntu 22.04 with XFCE desktop
- **Browser**: Firefox pre-installed
- **Automation**: @nut-tree-fork/nut-js for mouse/keyboard/screen control
- **VNC Access**: noVNC web interface for desktop takeover
