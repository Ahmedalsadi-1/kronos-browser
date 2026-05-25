# Kronos & Bytebot Ecosystem: Comprehensive Codebase Report

This report provides a detailed overview of the Kronos/Bytebot monorepo, covering its architecture, components, initialization status, and technical stack as of May 2026.

## 1. Project Vision
The **Kronos Ecosystem** is an ambitious, multi-layered platform designed to create a "sovereign" AI desktop environment. It integrates a custom browser (BrowserOS), a desktop orchestration layer (Kronbot/Bytebot), and specialized AI agents capable of both web and OS-level automation.

The vision, as described in `CONCEPT.jpg` and `README.md`, involves:
- **BrowserOS:** A Chromium fork optimized for AI control via a specialized extension and MCP server.
- **Kronbot (Bytebot):** The "brain" that orchestrates tasks, manages sessions, and proxies LLM requests.
- **Void:** A fork of VS Code for AI-native development.
- **Kronos Browser:** A Zen Browser (Firefox) fork for the primary user interface.

---

## 2. System Architecture
The ecosystem is divided into three primary functional layers:

### A. The Orchestration Layer (`kronbot/packages/`)
This layer handles the high-level logic, user interface, and agent management.
- **`bytebot-ui`**: A Next.js (App Router) management dashboard. It uses Tailwind CSS 4 and NextUI for a modern, "glassmorphism" aesthetic. It communicates with agents via a proxy server (`server.ts`).
- **`bytebot-agent` & `bytebot-agent-cc`**: NestJS-based orchestration services. They manage task lifecycles and use Prisma for PostgreSQL database interactions.
- **`shared`**: A TypeScript package containing shared types, constants, and utilities used across all `kronbot` services.
- **`bytebot-llm-proxy`**: A LiteLLM-powered proxy to manage and rotate API keys for various LLM providers.

### B. The Browser Automation Layer (`kronbot/kronosOS/packages/browseros-agent`)
This layer provides the "eyes" and "hands" within the web browser.
- **`@kronos/server` (apps/server)**: A Bun-based MCP (Model Context Protocol) server that exposes browser controls (navigation, clicking, snapshots, screenshots) to the AI agents.
- **`@kronos/assistant` (apps/agent)**: A browser extension that injects into BrowserOS to provide deep DOM access and interaction capabilities.
- **`agent-sdk`**: A client SDK for interacting with the BrowserOS agent programmatically.

### C. The OS Automation Layer (`kronbot/packages/bytebotd`)
The "Physical" automation layer.
- **`bytebotd`**: A NestJS service focused on "Computer Use". It utilizes `nut.js` for mouse/keyboard control and tracking. It is designed to run in a containerized desktop environment (as seen in its `Dockerfile` and `root/` configs for Supervisor and LightDM).

---

## 3. Technical Stack
- **Languages**: TypeScript (Primary), Python (Chromium build scripts), Swift (planned for Kronos Browser).
- **Frontend**: Next.js 15+, Tailwind CSS 4, NextUI, Framer Motion.
- **Backend**: NestJS (Orchestration/OS), Bun (MCP Server/Agent).
- **Database**: PostgreSQL with Prisma ORM.
- **Automation**: Playwright (verification), nut.js (OS level), CDP (Chrome DevTools Protocol).
- **Environment**: Docker & Docker Compose for multi-service orchestration.

---

## 4. Initialization & Build Status
During the initialization phase, the following results were achieved:

| Component | Status | Verification |
| :--- | :--- | :--- |
| **`shared`** | **Ready** | Successfully built `dist/` artifacts. |
| **`bytebot-agent`** | **Ready** | Deps installed, Prisma client generated. |
| **`bytebot-ui`** | **Ready** | Successfully built `.next` and verified via Playwright. |
| **`browseros-agent`** | **Ready** | Deps installed (Bun), unit tests passing. |
| **`bytebotd`** | **Ready** | Deps installed, NestJS build successful. |
| **`BrowserOS` (Chromium)** | **Placeholder** | Root directory exists but is currently empty. |
| **`void` / `kronos-browser`** | **Missing** | Source code not present in the current root. |

### Build Verification Notes:
- **`bytebot-ui`**: A regression in `Header.tsx` (unused variable causing build failure) was identified and fixed. Visual confirmation shows the dashboard rendering correctly.
- **`browseros-agent`**: Unit tests for config and page collection are passing. Integration tests are currently platform-locked to macOS (searching for `/Applications/BrowserOS.app`).

---

## 5. Key File Locations
- **Main Entry (UI)**: `kronbot/packages/bytebot-ui/src/app/page.tsx`
- **MCP Server Entry**: `kronbot/kronosOS/packages/browseros-agent/apps/server/src/index.ts`
- **OS Automation Entry**: `kronbot/packages/bytebotd/src/main.ts`
- **Docker Configs**: `kronbot/docker/`
- **Prisma Schema**: `kronbot/packages/bytebot-agent/prisma/schema.prisma`

---

## 6. Recommendations & Roadmap
1. **Platform Agnosticism**: Modify `browseros-agent` integration tests to support Linux paths for the Chromium binary.
2. **Database Connectivity**: Ensure a PostgreSQL instance is running at `postgres:5432` as expected by the agent's Prisma configuration.
3. **Chromium Integration**: Populate the `BrowserOS` directory with the fork source to enable full end-to-end automation testing.
4. **Extension Deployment**: Utilize the `built-extensions` in `kronos-os/` for manual browser testing.
