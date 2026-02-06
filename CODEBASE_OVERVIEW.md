# Codebase Overview: KRONOS-OS Monorepo

## 🚀 Overview
KRONOS-OS is a comprehensive, AI-driven ecosystem combining browser automation, agent orchestration, and desktop control. It integrates several powerful tools to create a seamless AI-assisted workspace.

---

## 📁 Monorepo Structure

### 1. Bytebot Agent Platform (`/kronbot`)
The core of the monorepo, providing a full virtual desktop environment for AI agents.
- **`packages/shared`**: Common utilities and types. (TypeScript, npm)
- **`packages/bytebot-agent`**: Main agent logic using NestJS and Prisma.
- **`packages/bytebot-agent-cc`**: Extended agent with Claude Code integration.
- **`packages/bytebot-ui`**: Next.js-based management dashboard.
- **`packages/bytebotd`**: Backend daemon for controlling the virtual desktop.
- **`packages/bytebot-llm-proxy`**: LiteLLM configuration for multi-provider support.

### 2. BrowserOS Agent (`/kronbot/kronosOS/packages/browseros-agent`)
A specialized suite for deep browser interaction via MCP (Model Context Protocol).
- **`apps/server`**: MCP server (@kronos/server) providing tools for browser control.
- **`apps/agent`**: A Chrome extension for the user-facing chat interface.
- **`apps/controller-ext`**: A bridge extension that enables `chrome.*` API access.
- **`packages/agent-sdk`**: SDK for building custom agents on top of BrowserOS.

### 3. Placeholders and Artifacts
- **`/BrowserOS`, `/EdgyArc-fr`, `/desktop`**: Currently empty directories, likely reserved for future components (Chromium fork, Arc-like UI, and desktop app).
- **`/kronos-os/built-extensions`**: Pre-compiled browser extensions ready for manual installation.
- **`/website`**: A simple landing page.

---

## 🛠 Tech Stacks

| Component | Technology |
| :--- | :--- |
| **Runtime** | Node.js, Bun |
| **Languages** | TypeScript |
| **Backend** | NestJS, Express, Hono |
| **Frontend** | Next.js, React, Tailwind CSS |
| **AI Integration** | MCP, LiteLLM, Google Gemini, Anthropic, OpenAI |
| **Database** | Prisma ORM, PostgreSQL/SQLite |
| **Automation** | CDP (Chrome DevTools Protocol), WebSocket |

---

## ⚙️ Initialization Performed
1.  **Shared Library**: Built `@bytebot/shared` to support all dependent services.
2.  **Bytebot Services**: Installed dependencies and generated Prisma clients for `bytebot-agent`, `bytebot-agent-cc`, and `bytebot-ui`.
3.  **BrowserOS Agent**: Initialized via `bun install`.
4.  **Environment Setup**:
    - Created `.env.development` for BrowserOS Server and Agent.
    - Created `.env` for Bytebot Agent CC.
5.  **Test Verification**:
    - Verified that Bytebot packages currently lack unit tests (matching memory).
    - Identified and fixed a missing dependency (`sinon`) in `@kronos/server` tests.

---

## ⚠️ Known Issues & Discrepancies
- **Missing Directories**: `void` and `kron-desktop` (mentioned in root README) are currently missing from the root directory.
- **Naming Conflicts**: Root scripts refer to `@browseros/server`, but the actual package name is `@kronos/server`.
- **Test Timeouts**: Some BrowserOS integration tests time out when run against standard Chrome instead of the specialized BrowserOS binary.

---

## 🚀 How to Run
Use the root launch script to start the ecosystem:
```bash
./launch_kronos.sh
```
