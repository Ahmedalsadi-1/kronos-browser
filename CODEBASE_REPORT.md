# Kronos OS Codebase Report

## 🏗 Architecture Overview

The Kronos OS project is a sophisticated, multi-project monorepo focused on AI-driven browser automation and desktop orchestration. It is divided into two primary ecosystems:

### 1. Kronos Agent (Kronbot)
Located in `kronbot/`, this is the desktop-level orchestration platform.
- **Microservices**:
  - `bytebot-agent`: Core AI agent logic using NestJS.
  - `bytebot-agent-cc`: Specialized agent with "Computer Control" capabilities via Anthropic's Claude Code.
  - `bytebotd`: A desktop daemon for direct hardware interaction (keyboard/mouse) using `nut-js`.
  - `bytebot-ui`: A Next.js frontend for managing agents and monitoring tasks.
  - `shared`: Common types and utilities used across all bytebot packages.
  - `bytebot-llm-proxy`: LiteLLM configuration for unified LLM access.

### 2. BrowserOS Agent
Located in `kronbot/kronosOS/packages/browseros-agent/`, this is a browser-specific automation layer.
- **Components**:
  - `@kronos/server`: An MCP (Model Context Protocol) server built with Hono.
  - `@kronos/assistant`: A WXT-based browser extension providing an AI sidebar.
  - `browseros-controller`: A bridge extension for deep Chrome API access.
  - `agent-sdk`: A TypeScript SDK for building browser automation scripts.

---

## 🛠 Tech Stack

- **Runtimes**: Node.js v22, Bun v1.2, Docker.
- **Languages**: TypeScript (Strict mode).
- **Frameworks**: Next.js 15 (App Router), NestJS, Hono.
- **Styling**: Tailwind CSS 4 (CSS-first approach).
- **Database**: Prisma ORM with SQLite (libSQL).
- **Communication**: WebSockets (Socket.io), REST, MCP.
- **Automation**: Playwright, nut-js, uiohook-napi.

---

## 🟢 Current Initialization Status

The following initialization steps have been successfully completed:

1.  **Shared Foundation**: `kronbot/packages/shared` is built and ready.
2.  **Database layer**: Prisma clients have been generated for both `bytebot-agent` and `bytebot-agent-cc`.
3.  **Build Status**:
    - `bytebot-agent`: Built successfully.
    - `bytebot-agent-cc`: Built successfully.
    - `bytebotd`: Built successfully.
    - `bytebot-ui`: Built successfully (resolved a blocking linting error in `Header.tsx`).
4.  **BrowserOS Server**: Initialized with `bun` and verified via unit tests (`page-collector.test.ts`).

---

## ⚠️ Missing or Placeholder Components

During exploration, the following discrepancies with documentation were found:
- **`void`**: Mentioned as a VS Code fork in `README.md`, but the directory is missing from the root.
- **`kron-desktop`**: Mentioned as a React desktop app, but the directory is missing from the root.
- **Root Directories**: `BrowserOS/`, `EdgyArc-fr/`, and `desktop/` exist at the root but are currently empty.
- **Rebranding**: There are over 1,100 remaining references to the legacy name "Bytebot" within the `kronbot/` directory, while the public-facing branding has moved to "Kronos".

---

## 🚀 Recommended Next Steps

1.  **Environment Configuration**: Ensure `.env` files are created for each service, particularly `BYTEBOT_AGENT_BASE_URL` for the UI.
2.  **Docker Orchestration**: The `docker-compose.yml` in `kronbot/docker/` can now be used to orchestrate the backend services.
3.  **Extension Loading**: The built extension artifacts are available in `kronbot/BrowserOS-agent/` and can be loaded into Chromium for testing.
