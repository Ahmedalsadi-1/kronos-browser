# 🌐 KRONOS-OS: DETAILED CODEBASE OVERVIEW

This document provides a technical summary of the Kronos-OS monorepo, its components, naming conventions, and current initialization status as of February 2026.

---

## 🏗️ High-Level Architecture

The Kronos-OS ecosystem is a multi-project monorepo designed for AI-powered browser and desktop automation. It is structured into several distinct layers:

1.  **Agent Orchestration (Kronbot)**: The core AI service that manages tasks and desktop interaction.
2.  **Browser Automation (BrowserOS)**: Specialized MCP servers and extensions for deep browser control.
3.  **Desktop Integration (Kronos Desktop)**: Modern interfaces for computer-control workflows.

---

## 🏷️ Naming Conventions & Rebranding

The codebase is currently undergoing a significant rebranding. You will see both names used throughout the directories and configuration files:

| Old Name | New Name | Current Folder(s) |
| :--- | :--- | :--- |
| **Bytebot** | **Kronbot** | `kronbot/`, `packages/bytebot-*` |
| **Factifai** | **Kronos Desktop**| `kron-desktop/`, `desktop/` |
| **BrowserOS** | **Kronos Browser** | `kronbot/kronosOS/`, `BrowserOS/` |

**Recommendation**: When adding new features, prefer the "Kronos" or "Kronbot" naming schemes.

---

## 📂 Component Map

### 1. Kronbot (AI Desktop Agent) - `kronbot/`
The primary orchestration layer.
*   `packages/shared`: Core logic, types, and utilities. **(Initialized & Built)**
*   `packages/bytebot-agent`: NestJS backend for general task handling. **(Initialized & Prisma Generated)**
*   `packages/bytebot-agent-cc`: NestJS backend with "Computer Control" (likely Claude Code) integration. **(Initialized & Prisma Generated)**
*   `packages/bytebot-ui`: Next.js frontend for the agent dashboard. **(Initialized)**
*   `packages/bytebotd`: Daemon for managing the virtual Linux/XFCE desktop environment. **(Initialized)**

### 2. BrowserOS Agent - `kronbot/kronosOS/packages/browseros-agent/`
Specialized toolset for AI browser interaction.
*   `apps/server`: The @kronos/server MCP server. **(Initialized)**
*   `packages/agent-sdk`: SDK for building browser agents. **(Initialized & Built)**
*   `apps/agent`: Chrome extension providing the "Assistant" UI.
*   `apps/controller-ext`: Extension bridge for browser API access.

### 3. Missing/Placeholder Components
*   **Void (Kronos Editor)**: Mentioned in docs as a VS Code fork, but not currently present in the source tree.
*   **Root Placeholders**: `BrowserOS/`, `EdgyArc-fr/`, and `desktop/` at the root are currently empty placeholders.

---

## 📡 Network & Ports

The ecosystem uses the following default port mappings:

| Service | Port | Description |
| :--- | :--- | :--- |
| **BrowserOS MCP** | `9100` | HTTP server for MCP and health checks. |
| **BrowserOS CDP** | `9000` | Chromium Debugging Protocol port. |
| **Kronbot UI** | `9992` | Next.js agent management dashboard. |
| **Kronbot Agent** | `9991` | Backend API for agent orchestration. |
| **Kronbot Daemon** | `9990` | Desktop daemon (VNC/Control). |
| **Desktop Backend** | `3001` | Express/NestJS backend for Kronos Desktop. |
| **Desktop Frontend**| `5173` | Vite/React frontend for Kronos Desktop. |

---

## 🛠️ Initialization Status

The following initialization steps have been completed:
- [x] **Shared Library**: `kronbot/packages/shared` built.
- [x] **Database Clients**: Prisma clients generated for both `bytebot-agent` and `bytebot-agent-cc`.
- [x] **Dependencies**: All major Node/Bun packages installed.
- [x] **Agent SDK**: BrowserOS agent-sdk built.
- [x] **Verification**: Basic health check tests passed for `@kronos/server`.

---

## 🚀 Future Development Notes

*   **Runtime**: Use **Bun** for `BrowserOS-agent` and **Node.js** for `kronbot`.
*   **Styling**: The system uses a "Cosmic Indigo" theme (Zinc-950 background, Indigo-600 primary).
*   **Virtualization**: Running the full Kronbot stack requires Docker to host the virtual desktop environment.
