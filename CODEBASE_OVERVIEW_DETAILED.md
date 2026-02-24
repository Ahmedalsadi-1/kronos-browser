# Kronos OS: Detailed Codebase Overview

This document provides a comprehensive overview of the Kronos OS monorepo, its components, architecture, and current status as of February 24, 2026.

## 🏗️ Architecture Overview

Kronos OS is an intelligent browser and desktop automation ecosystem composed of two primary sub-systems: **Kronbot (Bytebot)** and **BrowserOS**.

### 1. Kronbot (AI Desktop Agent)
An orchestration platform that allows AI agents to control a full virtual Linux desktop.

*   **`bytebot-agent`**: The core NestJS backend that handles task orchestration, LLM coordination (Anthropic, OpenAI, Gemini), and database management (Prisma/PostgreSQL).
*   **`bytebotd`**: A NestJS daemon running inside the virtual desktop. it provides a REST API for computer control (mouse, keyboard, screen) and handles VNC/noVNC proxying.
*   **`bytebot-ui`**: A Next.js (React) web interface for users to create tasks, view agent activity, and interact with the virtual desktop.
*   **`shared`**: Common TypeScript types and utilities used across all Kronbot packages.

### 2. BrowserOS (AI-Powered Browser)
A Chromium fork integrated with AI agents for web automation.

*   **`browseros-agent`**: A Bun-based monorepo containing:
    *   **`server`**: An MCP (Model Context Protocol) server that provides tools for browser control.
    *   **`agent`**: A Chrome extension providing a chat interface for the user.
    *   **`controller-ext`**: A hidden extension that bridges Chrome APIs (tabs, history, etc.) to the server via WebSockets.
*   **`browseros`**: The actual Chromium source code (forked and patched).

---

## 🛠️ Tech Stack

### Root & Orchestration
- **Runtime**: Node.js, Bun
- **Languages**: TypeScript, JavaScript
- **Deployment**: Docker Compose, Helm (Kubernetes)

### Kronbot Components
- **Backend**: NestJS, Prisma, Socket.IO
- **Frontend**: Next.js 15, React 19, Tailwind CSS 4, Radix UI, Lucide Icons
- **Desktop Control**: @nut-tree-fork/nut-js, uiohook-napi
- **Virtual Desktop**: Ubuntu 22.04, XFCE, noVNC

### BrowserOS Components
- **Server/SDK**: Bun, Hono, Zod, Commander
- **Extensions**: WXT (Web Extension Toolbox), React
- **Browser**: Chromium (C++, JS)

---

## 📂 Directory Structure (Active Projects)

```
kronos-os/
├── kronbot/
│   ├── packages/
│   │   ├── shared/            # Common types & utils
│   │   ├── bytebot-agent/     # Main NestJS Agent API (Port 9991)
│   │   ├── bytebot-agent-cc/  # Computer Control Agent (Port 9991)
│   │   ├── bytebotd/          # Desktop Daemon (Port 9990)
│   │   └── bytebot-ui/        # Next.js Frontend (Port 9992)
│   └── kronosOS/
│       └── packages/
│           ├── browseros-agent/ # Bun MCP Server & Extensions (Port 9100)
│           └── browseros/       # Chromium Source
└── assets/                    # Logos and UI assets
```

*Note: Root-level directories `BrowserOS/`, `desktop/`, and `EdgyArc-fr/` are currently empty placeholders.*

---

## 🚦 Component Status

| Component | Status | Initialization |
| :--- | :--- | :--- |
| **Shared** | 🟢 Ready | `npm install && npm run build` |
| **Bytebot Agent** | 🟢 Ready | `npm install && npx prisma generate` |
| **Bytebot Daemon** | 🟢 Ready | `npm install` |
| **Bytebot UI** | 🟢 Ready | `npm install` |
| **BrowserOS Agent** | 🟢 Ready | `bun install` |
| **Kronos Desktop** | 🟡 Placeholder | Directory empty/missing |
| **Void Editor** | 🟡 Placeholder | Directory missing |

---

## 📡 Network Configuration (Default Ports)

| Service | Port | Protocol | Description |
| :--- | :--- | :--- | :--- |
| **Bytebot Daemon** | 9990 | HTTP/WS | Desktop control & VNC proxy |
| **Bytebot Agent** | 9991 | HTTP/WS | Main orchestration API |
| **Bytebot UI** | 9992 | HTTP | User interface |
| **BrowserOS Server**| 9100 | HTTP/SSE | MCP Server & Agent API |
| **BrowserOS CDP** | 9000 | WS | Chromium DevTools Protocol |
| **BrowserOS Ext** | 9300 | WS | Controller extension bridge |

---

## 🚀 Getting Started

To initialize the environment for development:

1.  **Shared**: `cd kronbot/packages/shared && npm install && npm run build`
2.  **Agent**: `cd kronbot/packages/bytebot-agent && npm install && npx prisma generate`
3.  **UI**: `cd kronbot/packages/bytebot-ui && npm install`
4.  **BrowserOS**: `cd kronbot/kronosOS/packages/browseros-agent && bun install`

To run the services, use the `docker-compose` setup in `kronbot/docker` or follow individual package instructions in their respective `README.md` or `AGENTS.md` files.
