# 🌐 KRONOS-OS PROJECT OVERVIEW

Welcome to the **Kronos-OS** monorepo! This document provides a high-level map of the codebase, its components, and the current development status.

---

## 🏗️ Monorepo Structure

The repository is organized into several key areas, representing a suite of AI-integrated browser and desktop automation tools.

### 1. 🤖 Kronbot (Kronos Agent Orchestration)
Located in `kronbot/`, this is the primary backend and UI for the agent orchestration platform.
*   **`packages/shared`**: Core utilities and types used across the kronbot services. (Initialized)
*   **`packages/bytebot-agent`**: Standard AI agent service using Prisma for data persistence. (Initialized)
*   **`packages/bytebot-agent-cc`**: Computer Control (CC) version of the agent, integrated with `@anthropic-ai/claude-code`. (Initialized)
*   **`packages/bytebot-ui`**: Next.js-based web interface for managing agents (Port 9992). (Initialized)
*   **`packages/bytebotd`**: The "Bytebot Daemon," likely responsible for background tasks or process management. (Initialized)
*   **`packages/bytebot-llm-proxy`**: A LiteLLM-based proxy for orchestrating multiple LLM providers.

### 2. 🌐 BrowserOS Agent (MCP & Automation)
Located in `kronbot/kronosOS/packages/browseros-agent/`, this project provides deep browser automation.
*   **`apps/server`**: A Bun-based MCP (Model Context Protocol) server providing tools for browser interaction (Port 9100).
*   **`apps/agent`**: A Chrome extension (WXT-based) that acts as the UI/bridge for the agent.
*   **`packages/agent-sdk`**: A software development kit for building agents on the BrowserOS platform.

### 3. 🖥️ Pre-built & Placeholder Assets
The root directory contains several folders that serve as pre-built artifacts or future project placeholders:
*   **`kronos-os/built-extensions/`**: Contains pre-compiled macOS applications for the BrowserOS Controller and Assistant extensions.
*   **`website/`**: A static landing page for the project.
*   **`BrowserOS/`, `EdgyArc-fr/`, `desktop/`**: Currently empty directories, likely reserved for future modules or local development clones of the browser engine.

---

## 🛠️ Tech Stack & Conventions

| Layer | Technology |
|-------|------------|
| **Runtimes** | Node.js (v22), Bun (v1.2), Docker |
| **Languages** | TypeScript, JavaScript, Python (for build scripts) |
| **Frameworks** | Next.js, NestJS, Express |
| **Database** | Prisma ORM (SQLite/PostgreSQL) |
| **Linting** | ESLint, Biome (for BrowserOS) |
| **Package Managers** | npm, Bun |

---

## 🔌 Default Port Mappings

| Service | Port | Description |
|---------|------|-------------|
| **Kronos Agent UI** | 9992 | Next.js Frontend |
| **BrowserOS Server** | 9100 | MCP & Tool Server |
| **BrowserOS CDP** | 9000 | Chromium Debugging Port |
| **BrowserOS Extension**| 9300 | WebSocket Bridge |
| **Kronbot Daemon** | 9990 | Background Process Manager |
| **Agent API** | 9991 | Core Agent Services |

---

## 🚀 Initialization Status

The following packages have been successfully initialized with dependencies and build artifacts:
- ✅ `kronbot/packages/shared` (Built)
- ✅ `kronbot/packages/bytebot-agent` (Prisma Client Generated)
- ✅ `kronbot/packages/bytebot-agent-cc` (Prisma Client Generated)
- ✅ `kronbot/packages/bytebot-ui`
- ✅ `kronbot/packages/bytebotd`
- ✅ `kronbot/kronosOS/packages/browseros-agent` (Agent-SDK Built)

---

## 📝 Developer Notes
- **Prisma**: Always run `npx prisma generate` after modifying `schema.prisma` in the agent packages.
- **Bun**: Use `bun` exclusively for tasks within the `browseros-agent` tree.
- **Shared**: Changes to `@bytebot/shared` require a rebuild (`npm run build`) before they are reflected in the agent or UI packages.
