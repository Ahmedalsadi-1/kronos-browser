# Kronos-OS Codebase Overview

This document provides a comprehensive overview of the **Kronos-OS** monorepo, a collection of projects aimed at creating an AI-powered intelligent browser ecosystem.

## 🏗️ High-Level Architecture

The repository is structured as a multi-project monorepo. It integrates several independent systems, primarily focused on AI agents, browser automation, and virtual desktop environments.

### 📁 Directory Structure & Status

| Directory | Project Name | Status | Description |
| :--- | :--- | :--- | :--- |
| `kronbot/` | **Kronbot (Bytebot)** | 🟢 Initialized | AI desktop agent orchestration platform. |
| `kronbot/kronosOS/packages/browseros-agent/` | **BrowserOS Agent** | 🟢 Initialized | Bun-based MCP server & Chrome extensions for browser automation. |
| `desktop/` | **Kronos Desktop** | ⚪ Placeholder | Root directory is currently empty. |
| `BrowserOS/` | **BrowserOS (Engine)** | ⚪ Placeholder | Root directory is currently empty. |
| `EdgyArc-fr/` | **EdgyArc-fr** | ⚪ Placeholder | Root directory is currently empty. |
| `website/` | **Project Website** | 🟡 Minimal | Simple static site with `index.html`. |
| `kronos-os/built-extensions/` | **Extensions** | 🟢 Available | Contains pre-built browser extensions for Safari/Chrome. |

---

## 🤖 Major Project: Kronbot (Bytebot)

Located in `kronbot/`, this project provides a platform for running AI agents within a virtual Linux desktop environment. It uses a microservices architecture.

### Microservices:
- **`packages/shared`**: Core library for types and utilities used across the system. (Built to `dist/`)
- **`packages/bytebot-agent`**: The main NestJS service for agent orchestration. Connects to LLMs (Anthropic, OpenAI, Gemini) and manages tasks. Uses Prisma for database interactions.
- **`packages/bytebot-agent-cc`**: A specialized agent service for "Computer Control" (nut.js integration).
- **`packages/bytebotd`**: A daemon running in the virtual desktop to execute low-level input commands (mouse, keyboard, screenshots).
- **`packages/bytebot-ui`**: A Next.js web application for interacting with the agents and viewing the virtual desktop.

### Stack:
- **Runtime**: Node.js (v20+ recommended)
- **Framework**: NestJS (Backend), Next.js (Frontend)
- **Database**: Prisma with SQLite/PostgreSQL
- **Containerization**: Docker & Docker Compose (`docker/docker-compose.yml`)

---

## 🌐 Major Project: BrowserOS Agent

Located in `kronbot/kronosOS/packages/browseros-agent/`, this project enables browser automation via the Model Context Protocol (MCP).

### Components:
- **`apps/server`**: A Bun-based Hono server that provides an MCP interface for browser tools.
- **`apps/controller-ext`**: A Chrome extension that acts as a bridge between the browser's internal `chrome.*` APIs and the MCP server via WebSockets.
- **`apps/agent`**: A chat interface extension for the agent.
- **`packages/shared`**: Shared constants (ports, timeouts) and types.

### Stack:
- **Runtime**: Bun
- **Communication**: HTTP/SSE (MCP), WebSockets (Extension Bridge)
- **Linting**: Biome

---

## 🛠️ Development & Initialization

### Prerequisites
- **Node.js** v22.22.0+
- **Bun** v1.2.14+
- **Docker** (for running the full Kronbot stack)

### Initialization Status
All active projects have been initialized in the current environment:
1.  **Shared Library**: Built in `kronbot/packages/shared`.
2.  **Microservices**: `npm install` and `npx prisma generate` completed for all agent services.
3.  **UI**: Dependencies installed for `bytebot-ui`.
4.  **BrowserOS Agent**: `bun install` completed, and baseline tests in `apps/server` pass.

### Common Commands
- **Launch Ecosystem**: `./launch_kronos.sh`
- **Test BrowserOS**: `cd kronbot/kronosOS/packages/browseros-agent/apps/server && bun test tests/common/page-collector.test.ts`
- **Build Kronbot Shared**: `cd kronbot/packages/shared && npm run build`

---

## ⚠️ Notes & Known Issues
- **Rebranding**: The project is transitioning from "Bytebot" to "Kronbot" and "Factifai" to "Kronos Desktop". You will see both names in the code and documentation.
- **Placeholder Directories**: `BrowserOS/`, `EdgyArc-fr/`, and `desktop/` at the root are currently placeholders. The actual active code for these features is currently nested within `kronbot/`.
- **Void IDE**: Mentioned in documentation but currently missing from the root directory.
