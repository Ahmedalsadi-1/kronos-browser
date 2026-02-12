# Kronos OS Codebase Overview

This document provides a comprehensive inventory and description of the projects within the `kronos-os` monorepo.

## 🚀 Projects Overview

| Project | Location | Purpose | Tech Stack | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Kronbot (Bytebot)** | `kronbot/` | AI desktop agent orchestration platform. | NestJS, Next.js, Prisma, Docker | 🟢 Initialized |
| **BrowserOS Agent** | `kronbot/kronosOS/packages/browseros-agent/` | MCP server and Chrome extension bridge for browser automation. | Bun, TypeScript | 🟢 Initialized |
| **Kronos Desktop** | `desktop/` | Modern desktop application for computer control. | React, Vite (Expected) | ⚪ Placeholder (Empty) |
| **Kronos Editor (Void)** | `void/` (Missing) | VS Code fork with AI features. | TypeScript, Electron | ⚪ Missing |
| **Kronos Browser** | `BrowserOS/` | Chromium fork with integrated AI agents. | C++, Python (patches) | ⚪ Placeholder (Empty) |

---

## 🏗️ Detailed Component Analysis

### 1. Kronbot (formerly Bytebot)
Located in `kronbot/packages/`, this is the core agent orchestration platform.
*   **`bytebot-agent`**: Main agent logic using NestJS.
*   **`bytebot-agent-cc`**: Computer control specific agent logic.
*   **`bytebot-ui`**: Next.js web interface for managing tasks.
*   **`bytebotd`**: Daemon process for agent execution.
*   **`shared`**: Common utilities and types.

### 2. BrowserOS Agent
Located in `kronbot/kronosOS/packages/browseros-agent/`, this provides the bridge between LLMs and the browser.
*   **`apps/server`**: Bun-based HTTP/WebSocket server (port 9100) providing MCP tools.
*   **`apps/agent`**: Chrome extension providing the user interface.
*   **`apps/controller-ext`**: Background extension for low-level browser control.
*   **`packages/agent-sdk`**: SDK for developing new agent tools.

### 3. Built Extensions
Located in `kronos-os/built-extensions/`, contains pre-packaged browser extensions (e.g., `BrowserOS Controller.app`, `Assistant.app`) for Safari/Chrome.

---

## 🔄 Rebranding Status
The codebase is currently undergoing a rebranding from **Bytebot/Factifai** to **Kronos/Kronbot**.
*   Root documentation (`README.md`, `AGENTS.md`, `GEMINI.md`) and launch scripts use the new **Kronos** branding.
*   Internal source code, package names, and deep documentation within `kronbot/` still use the **Bytebot** branding.

---

## 🛠 Initialization Details
The following steps were performed to initialize the environment:
1.  **Shared Library**: Built `@bytebot/shared`.
2.  **Bytebot Services**: Installed dependencies and generated Prisma clients for `bytebot-agent` and `bytebot-agent-cc`.
3.  **BrowserOS Agent**: Installed dependencies using Bun and built the `agent-sdk`.
4.  **Verification**: Verified that the server tests in `browseros-agent` pass.

---

## 📂 Placeholder Directories
The following directories are currently empty placeholders in the root:
*   `BrowserOS/`
*   `EdgyArc-fr/`
*   `desktop/` (intended for Kronos Desktop)

---
*Updated: Feb 2026*
