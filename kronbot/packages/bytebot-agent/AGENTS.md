# BYTEBOT-AGENT - AI ORCHESTRATION SERVICE

**Generated:** 2026-01-13
**Commit:** local-dev
**Branch:** local

## OVERVIEW
NestJS service orchestrating AI agents. Manages tasks, coordinates LLM providers (Anthropic/OpenAI/Gemini), integrates with desktop control, handles message streaming.

## STRUCTURE
```
bytebot-agent/src/
├── agent/                 # Agent orchestration core
│   ├── agent.processor.ts  # Main agent logic
│   ├── agent.scheduler.ts  # Task scheduling
│   ├── agent.computer-use.ts # Desktop integration
│   └── agent.tools.ts    # Agent tool definitions
├── tasks/                # Task management
│   ├── tasks.service.ts
│   ├── tasks.controller.ts
│   └── tasks.gateway.ts   # WebSocket real-time updates
├── messages/              # Message persistence
├── anthropic/            # Anthropic Claude integration
├── openai/               # OpenAI GPT integration
├── google/               # Google Gemini integration
├── proxy/                # LLM proxy service
└── prisma/               # Database client
```

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| Agent orchestration | src/agent/ | Core agent logic, scheduling |
| Task CRUD | src/tasks/tasks.service.ts | Task lifecycle management |
| Task WebSocket | src/tasks/tasks.gateway.ts | Real-time task updates |
| LLM providers | src/{anthropic,openai,google}/ | Provider implementations |
| Database | prisma/schema.prisma | Task/message models |
| Agent tools | src/agent/agent.tools.ts | Tool definitions for LLM |

## CONVENTIONS

### Module Organization
- **One module per domain**: Each domain has its own module file (`*.module.ts`)
- **DTOs**: Data transfer objects in `dto/` subdirectory
- **Gateways**: WebSocket gateways for real-time communication
- **Controllers**: REST endpoints in `*.controller.ts`

### Database
- **Prisma ORM**: Schema in `prisma/schema.prisma`
- **Generate on build**: `npx prisma generate` runs before compilation
- **Migrations**: Use `npx prisma migrate dev` for schema changes

### LLM Integration
- **Provider modules**: Each provider has dedicated module (anthropic.module.ts, etc.)
- **Tools export**: Each provider exports tools in `*.tools.ts`
- **Constants**: Provider config in `*.constants.ts`

## COMMANDS
```bash
cd packages/bytebot-agent

# Development
npm run start:dev           # Builds shared + runs NestJS in watch mode

# Production
npm run build              # Builds shared + prisma generate + NestJS build
npm run start:prod         # Runs production with migrations

# Database
npm run prisma:dev        # Run migrations + generate client

# Testing
npm run test              # Jest unit tests
npm run test:e2e          # End-to-end tests

# Quality
npm run lint               # ESLint with auto-fix
```

## ANTI-PATTERNS

### Database Access
- **NEVER access Prisma without module**: Use `PrismaService` via dependency injection
- **NEVER modify schema directly**: Use Prisma migrations
- **NEVER skip prisma generate**: Required for type safety

### Build Order
- **ALWAYS build shared first**: All packages depend on `@bytebot/shared`

## NOTES

### LLM Providers
Each provider module exports:
- `*Service`: Main LLM client
- `*Tools`: Tool functions for the LLM
- `*Constants`: Provider configuration

### WebSocket Gateway
`tasks.gateway.ts` provides real-time task updates to UI clients.
