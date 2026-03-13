# Codebase Report - Kronos OS

## Overview
Kronos OS is an intelligent browser ecosystem and AI agent orchestration platform. The repository is a monorepo containing multiple subprojects, though some are currently placeholders or in early development.

## Project Structure & Components

### 1. Kronbot (AI Agent Orchestration)
Located in `kronbot/`, this is the core of the AI agent platform.
- **`packages/shared`**: Common types and utilities used by all Kronbot services.
- **`packages/bytebot-agent`**: The main AI agent service (NestJS).
- **`packages/bytebot-agent-cc`**: AI agent with computer control capabilities (NestJS + Claude Code).
- **`packages/bytebot-ui`**: The web-based management interface (Next.js).
- **`packages/bytebotd`**: The daemon service for managing the virtual desktop environment.
- **`packages/bytebot-llm-proxy`**: A proxy for LLM requests (LiteLLM).

### 2. BrowserOS Agent (Browser Automation)
Located in `kronbot/kronosOS/packages/browseros-agent`.
- A Bun-based MCP server and Chrome extension bridge for browser control.
- Provides deep interaction capabilities via CDP.

### 3. Pre-built Artifacts
- **`kronbot/BrowserOS-agent/`**: Contains built artifacts for the browser extension (content scripts, icons, etc.).
- **`kronos-os/built-extensions/`**: Placeholder for built extension packages.

### 4. Missing/Placeholder Components
The following directories are currently empty or contain only basic placeholders, despite being mentioned in the main README:
- `void/` (Kronos Editor / VS Code fork)
- `kron-desktop/` (Desktop app frontend/backend)
- `BrowserOS/` (at root)
- `EdgyArc-fr/` (at root)
- `desktop/` (at root)
- `Agentic-Browser-Extension/` (inside `kronbot/`)

## Initialization Status
The following components have been successfully initialized (dependencies installed, build/generation steps completed):
- ✅ `kronbot/packages/shared` (Built)
- ✅ `kronbot/packages/bytebot-agent` (Prisma generated)
- ✅ `kronbot/packages/bytebot-agent-cc` (Prisma generated)
- ✅ `kronbot/packages/bytebot-ui` (Dependencies installed, lint fixed)
- ✅ `kronbot/packages/bytebotd` (Dependencies installed)
- ✅ `kronbot/kronosOS/packages/browseros-agent` (Bun install completed)

## Tech Stack
- **Languages**: TypeScript, JavaScript
- **Runtimes**: Node.js (v22), Bun
- **Frameworks**: NestJS, Next.js, React
- **Database**: Prisma with SQLite/PostgreSQL
- **Infrastructure**: Docker, Docker Compose

## Known Issues & Observations
- **Rebranding**: The project is undergoing a rebrand from "Bytebot" to "Kronbot/Kronos". Many internal paths and package names still use the "Bytebot" name.
- **Tests**:
    - Many Kronbot microservices lack unit tests in their `src` directories.
    - `browseros-agent` tests have hardcoded macOS paths, causing failures in Linux-based environments.
    - Added `sinon` to `browseros-agent` to resolve a test dependency issue.
- **Build Verification**: `bytebot-ui` required a small fix to `Header.tsx` (unused `useTheme` import) to pass strict linting. `shared` required a fix for a `no-case-declarations` ESLint error.
