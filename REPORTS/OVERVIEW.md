# KRONOS-OS Codebase Overview

## 🏗 High-Level Architecture
KRONOS-OS is a multi-project monorepo focused on AI-powered browser automation and agent orchestration. The repository is in a state of rebranding and transition, with many components moving from their original names (Bytebot, Factifai) to the new Kronos branding.

### 📂 Key Projects & Directories

| Project | Location | Description |
| :--- | :--- | :--- |
| **Kronbot (formerly Bytebot)** | `kronbot/` | AI desktop agent orchestration platform. Includes a virtual Ubuntu desktop, NestJS agents, and a Next.js UI. |
| **BrowserOS Agent** | `kronbot/kronosOS/packages/browseros-agent` | Bun-based MCP server and Chrome extension bridge for deep browser automation. |
| **Kronos Desktop** | `desktop/` (placeholder) | Future home of the desktop application (React/NextUI). |
| **Void** | `void/` (placeholder) | Future home of the VS Code fork for AI-assisted coding. |
| **EdgyArc-fr** | `EdgyArc-fr/` (placeholder) | Arc-like browser features. |

## 🛠 Technology Stack

- **Runtimes**: Node.js (v22), Bun (v1.2)
- **Languages**: TypeScript, JavaScript
- **Backend**: NestJS, Express, Prisma (PostgreSQL)
- **Frontend**: Next.js, React, Tailwind CSS 4, NextUI
- **Automation**: Playwright, CDP (Chrome DevTools Protocol), MCP (Model Context Protocol)
- **Infrastructure**: Docker, Docker Compose, Helm

## 🚀 Initialization Process

To initialize the core functional components of the codebase:

1. **Shared Library**:
   ```bash
   cd kronbot/packages/shared && npm install && npm run build
   ```
2. **Kronbot Agents**:
   ```bash
   cd kronbot/packages/bytebot-agent && npm install && npx prisma generate
   cd kronbot/packages/bytebot-agent-cc && npm install && npx prisma generate
   ```
3. **Kronbot UI**:
   ```bash
   cd kronbot/packages/bytebot-ui && npm install
   ```
4. **BrowserOS Agent**:
   ```bash
   cd kronbot/kronosOS/packages/browseros-agent && bun install
   ```

## 📋 Current Status (Jan 2026)
- **Active Development**: Centered around `kronbot/` and its nested submodules.
- **Rebranding**: Ongoing transition from "Bytebot" to "Kronbot" and "Factifai" to "Kronos Desktop".
- **Empty Placeholders**: Several root-level directories (`BrowserOS/`, `desktop/`, `EdgyArc-fr/`, `void/`) are currently empty placeholders or submodules that need separate initialization.
- **Build Status**: `kronbot` microservices and `browseros-agent` are building successfully after initialization.
