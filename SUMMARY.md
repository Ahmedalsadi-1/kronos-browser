# Kronos OS Codebase Summary

## 🛠 Project Overview
Kronos OS is a comprehensive, multi-project monorepo focused on AI-driven browser automation and desktop orchestration. It represents an evolution and rebranding of several previous projects (Bytebot, Factifai).

## 📂 Monorepo Structure

### 1. **Kronos Agent (formerly Bytebot/Kronbot)**
Located in `kronbot/`, this is the core orchestration platform.
- **`bytebot-agent`**: NestJS-based orchestration agent that coordinates tasks and AI providers.
- **`bytebot-ui`**: Next.js-based management dashboard for monitoring and creating tasks.
- **`bytebotd`**: Desktop daemon that facilitates "computer use" capabilities on Ubuntu environments.
- **`shared`**: A TypeScript package containing shared types and utilities used across the ecosystem.
- **`bytebot-agent-cc`**: Control Center variant/extension of the orchestration agent.

### 2. **BrowserOS Agent**
Located in `kronbot/kronosOS/packages/browseros-agent/`, this is a high-performance browser automation suite.
- **Tech Stack**: Bun, TypeScript, Biome.
- **`apps/server`**: A Bun-based MCP (Model Context Protocol) server for browser interaction.
- **`apps/agent`**: A Chrome extension that acts as a bridge between the LLM and the browser.
- **`packages/agent-sdk`**: A dedicated SDK for building agents that leverage BrowserOS capabilities.

### 3. **Legacy/Placeholder Directories**
- **`BrowserOS/`**, **`EdgyArc-fr/`**, **`desktop/`**: Currently appear as placeholders or contains minimal structure at the root level, with active development shifted into the `kronbot/` directory.

## 🚀 Initialization State (as of April 2026)

The environment has been fully initialized for development:
1.  **Shared Utilities**: `@bytebot/shared` has been built and is ready for use by dependent packages.
2.  **Agent Services**: `bytebot-agent` and `bytebotd` have their dependencies installed. Prisma client has been generated for `bytebot-agent`.
3.  **Frontend**: `bytebot-ui` dependencies are installed and the custom Express server is ready for development.
4.  **Browser Automation**: The `BrowserOS-agent` monorepo has been initialized using Bun. The `agent-sdk` has been built successfully.

## 🔧 Technical Specifications

| Layer | Technologies |
| :--- | :--- |
| **Runtime** | Bun (v1.2.14), Node.js (v22.22.1) |
| **Backend** | NestJS, Express |
| **Frontend** | Next.js, React, Tailwind CSS 4, NextUI |
| **Database** | Prisma (PostgreSQL support) |
| **Orchestration** | Docker, Docker Compose |
| **Protocols** | MCP (Model Context Protocol), CDP (Chrome DevTools Protocol) |

## 📖 Key Documentation
- `README.md`: High-level ecosystem overview.
- `AGENTS.md`: Detailed developer guide and conventions.
- `GEMINI.md`: Specific context for AI assistant interactions.
- `INTEGRATION_CHECKLIST.md`: Roadmap for Kronos Browser and Agent integration.
