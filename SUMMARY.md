# KRONOS-OS Project Overview

## Repository Structure & Components

The KRONOS-OS repository is a multi-project monorepo containing several independent but integrated products focused on AI-powered browser and desktop automation.

### 1. `kronbot/` (Agent Orchestration Platform)
The core of the "Bytebot" ecosystem, providing a platform for managing and orchestrating AI agents.
- **`packages/shared`**: Common utilities and types used across all `kronbot` packages. Built to `dist/`.
- **`packages/bytebot-agent`**: NestJS-based orchestration agent. Uses Prisma for database management.
- **`packages/bytebot-agent-cc`**: A variant or component of the bytebot agent (possibly "Claude Code" integration).
- **`packages/bytebot-ui`**: Next.js-based web interface for managing tasks and agents.
- **`packages/bytebotd`**: A daemon service for background tasks and possibly direct desktop interaction.
- **`packages/bytebot-llm-proxy`**: A proxy for LLM requests, managed via Docker.

### 2. `kronbot/kronosOS/` (Browser Engine & Automation)
Contains the "BrowserOS" components, which seem to be a specialized browser and its automation agent.
- **`packages/browseros-agent`**: A Bun-based monorepo containing:
    - **`apps/server`**: An MCP (Model Context Protocol) server for browser automation.
    - **`apps/agent`**: A Chrome extension (built with WXT) that bridges the browser to the server.
    - **`packages/agent-sdk`**: SDK for building agents that interact with BrowserOS.
- **`packages/browseros`**: Likely the source or build configuration for the specialized Chromium-based browser.

### 3. Other Root Components (Placeholders or Submodules)
- **`BrowserOS/`, `EdgyArc-fr/`, `desktop/`**: Currently empty directories in the root, potentially for future submodules or external projects.
- **`kronos-os/`**: Contains pre-built browser extensions (`built-extensions/`).
- **`website/`**: A landing page or placeholder for the project website.

---

## Initialization Status

All major components have been initialized and verified as follows:

| Component | Path | Actions Taken | Status |
|-----------|------|---------------|--------|
| Shared | `kronbot/packages/shared` | `npm install`, `npm run build` | ✅ Built |
| BrowserOS Agent | `kronbot/kronosOS/packages/browseros-agent` | `bun install`, `.env` setup | ✅ Ready |
| Bytebot Agent | `kronbot/packages/bytebot-agent` | `npm install`, `.env`, `prisma generate` | ✅ Ready |
| Bytebot Agent CC | `kronbot/packages/bytebot-agent-cc` | `npm install`, `.env`, `prisma generate` | ✅ Ready |
| Bytebot UI | `kronbot/packages/bytebot-ui` | `npm install`, `.env` setup | ✅ Ready |
| Bytebot Daemon | `kronbot/packages/bytebotd` | `npm install` | ✅ Ready |

### Verification Details
- **Build Artifacts**: `shared/dist`, `agent-sdk/dist`, and Prisma clients were successfully generated.
- **Environment**: `.env` files were created from examples for all relevant packages.
- **Testing**: `bun test` was run for `browseros-agent`. While some integration tests failed due to the absence of the `BrowserOS` application binary in the sandbox, core logic tests (e.g., `page-collector.test.ts`) passed successfully.
