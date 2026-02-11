# Kronos OS - Codebase Overview

This document provides a comprehensive overview of the current state of the Kronos OS monorepo, its components, and the initialization status.

## 🏗️ Architecture & Components

The codebase is organized into several key areas, primarily centered around the `kronbot/` directory.

### 1. Kronos Agent (formerly Kronbot/Bytebot)
Located in `kronbot/packages/`. This is the core of the agent orchestration platform.

- **`shared`**: Common utilities and types. (Prerequisite for other services)
- **`bytebot-agent`**: NestJS service for agent orchestration and LLM coordination. Uses Prisma for database management.
- **`bytebot-agent-cc`**: Computer control agent, specializing in desktop automation via `nut.js`.
- **`bytebot-ui`**: Next.js-based web interface for task management and desktop visualization.
- **`bytebotd`**: Desktop daemon for computer control and input tracking.
- **`bytebot-llm-proxy`**: (Placeholder/Config) Orchestrates LLM providers via LiteLLM.

### 2. BrowserOS Agent
Located in `kronbot/kronosOS/packages/browseros-agent/`. A Bun-based monorepo for intelligent browser automation.

- **`apps/server`**: MCP (Model Context Protocol) server (Port 9100).
- **`apps/agent`**: Chrome extension providing a chat interface within the browser.
- **`apps/controller-ext`**: Chrome extension that bridges `chrome.*` APIs to the server via WebSocket.
- **`packages/agent-sdk`**: SDK for developing BrowserOS agents.

### 3. Docker Infrastructure
Located in `kronbot/docker/`. Contains `docker-compose.yml` for deploying the entire Kronbot ecosystem, including:
- PostgreSQL database.
- Virtual Linux desktop (Ubuntu 22.04 + XFCE).
- Agent services and UI.

---

## 🔍 Discrepancies & Observations

While the documentation (`README.md`, `AGENTS.md`, `GEMINI.md`) mentions a vast ecosystem, several components are currently missing or are empty placeholders in the root directory:

- **Missing/Empty Sources:**
    - `void/`: The VS Code fork is mentioned but the directory is missing.
    - `kron-desktop/`: Mentioned in `launch_kronos.sh` but the root `desktop/` directory is empty.
    - `BrowserOS/`: The root directory is an empty placeholder.
    - `EdgyArc-fr/`: An empty placeholder for an Arc-like browser.
    - `kronos-browser/`: Mentioned as a Firefox fork but not present in the root.

- **Rebranding:**
    - The project has undergone significant rebranding:
        - `Bytebot` → `Kronbot` / `Kronos Agent`
        - `Factifai` → `Kronos Desktop`
    - This has left some inconsistencies in directory names and documentation.

---

## ⚙️ Initialization Status

The following steps were taken to initialize the present components:

1. **`kronbot/packages/shared`**: `npm install` and `npm run build` (Successful).
2. **`kronbot/packages/bytebot-agent`**: `npm install` and `npx prisma generate` (Successful).
3. **`kronbot/packages/bytebot-agent-cc`**: `npm install` and `npx prisma generate` (Successful).
4. **`kronbot/packages/bytebot-ui`**: `npm install` (Successful).
5. **`kronbot/packages/bytebotd`**: `npm install` (Successful).
6. **`kronbot/kronosOS/packages/browseros-agent`**: `bun install` (Successful).

---

## 🧪 Testing

- **BrowserOS Server**: Verified via `bun test tests/common/page-collector.test.ts`.
- **Bytebot Services**: Build verification passes, but unit tests are currently sparse in the `src/` directories.

---

## 🎨 Design System

Kronos OS uses a **"Cosmic Indigo"** theme across its applications:
- **Primary**: Indigo-600 (`#4F46E5`)
- **Background**: Zinc-950 (`#09090B`)
- **Surface**: Zinc-900 (`#18181B`)
