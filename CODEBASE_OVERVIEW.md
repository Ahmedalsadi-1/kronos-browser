# Codebase Overview - Kronos OS

This document provides a comprehensive inventory of the projects and structure within the `kronos-os` monorepo, as of January 2026.

## 🏛 High-Level Architecture

The repository is structured as a multi-project monorepo, although many top-level directories are currently empty placeholders. The primary active codebase resides within the `kronbot/` directory.

### Active Projects

#### 1. Kronbot (Bytebot)
- **Location:** `kronbot/packages/`
- **Description:** An open-source AI desktop agent orchestration platform that provides a virtual Ubuntu desktop for AI agents to interact with.
- **Microservices:**
  - `bytebot-agent`: The main AI agent coordination service (NestJS).
  - `bytebot-agent-cc`: Claude Code integration service (NestJS).
  - `bytebot-ui`: The web-based management interface (Next.js).
  - `bytebotd`: The desktop daemon service.
  - `bytebot-llm-proxy`: Proxy for LLM providers (LiteLLM).
  - `shared`: Common utilities and types.
- **Initialization:** Requires `npm install` across all packages and `npm run build` in `shared`. Database migrations via Prisma are required for `bytebot-agent`.

#### 2. BrowserOS Agent
- **Location:** `kronbot/kronosOS/packages/browseros-agent/`
- **Description:** A Bun-based MCP (Model Context Protocol) server and Chrome extension workspace for intelligent browser automation.
- **Components:**
  - `apps/server`: The MCP server.
  - `apps/agent`: The Chrome extension UI.
  - `apps/controller-ext`: The browser controller bridge.
- **Built Extension:** A pre-compiled version of the extension can be found at `kronbot/BrowserOS-agent/`.

#### 3. BrowserOS (Specialized Chromium)
- **Location:** `kronbot/kronosOS/packages/browseros/`
- **Description:** Contains build scripts, patches, and configurations for a specialized version of Chromium tailored for AI agent interaction.

---

## 🔍 Directory Inventory & Discrepancies

There are significant discrepancies between the root documentation (`README.md`, `AGENTS.md`) and the actual file system state.

| Path | Expected Content | Actual Status |
| :--- | :--- | :--- |
| `BrowserOS/` | Chromium fork with AI agents | **Empty** (Source moved to `kronbot/kronosOS/`) |
| `desktop/` | Kronos Desktop (React + Express) | **Empty** |
| `void/` | AI-powered code editor (VS Code fork) | **Missing** |
| `EdgyArc-fr/` | Arc-like browser features | **Empty** |
| `website/` | Project website | Contains only a placeholder `index.html` |
| `kronos-os/` | Built extensions | Contains an empty `built-extensions/` directory |

---

## 🛠 Initialization Status

The following initialization steps have been performed in the current environment:

- [x] **Kronbot Shared:** `npm install` and `npm run build` completed.
- [x] **Bytebot Microservices:** `npm install` completed for all services.
- [x] **Prisma:** Generated clients for `bytebot-agent` and `bytebot-agent-cc`.
- [x] **BrowserOS Agent:** `bun install` completed in the workspace.

### Note on Testing
- **Bytebot services** currently lack unit tests (`.spec.ts` files) in their `src` directories.
- **BrowserOS Agent server** has functional tests. A missing dependency (`sinon`) and the need for a `.env.development` file were identified as prerequisites for running these tests locally.

---

## 🎨 Theme Information
The ecosystem uses a unified **Cosmic Indigo** theme:
- **Primary:** Indigo-600 (`#4F46E5`)
- **Background:** Zinc-950 (`#09090B`)
- **Surface:** Zinc-900 (`#18181B`)
