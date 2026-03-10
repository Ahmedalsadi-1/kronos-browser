# Codebase Report - Kronos OS Monorepo

## Overview

The **Kronos OS** monorepo is a sophisticated ecosystem of AI-driven projects, including intelligent browsers, automation agents, and desktop interfaces. The codebase has undergone significant rebranding, transitioning from original names like "Bytebot" and "Factifai" to the unified "Kronos" and "BrowserOS" brands.

---

## 📂 Project Structure

| Directory | Project Name | Description | Tech Stack |
| :--- | :--- | :--- | :--- |
| `kronbot/` | **Kronbot (Bytebot)** | AI Agent orchestration platform. | Node.js, NestJS, Next.js, Prisma, Docker |
| `kronbot/kronosOS/` | **BrowserOS Agent** | Bun-based MCP server and Chrome extensions. | Bun, TypeScript, Chrome Extensions |
| `kronbot/packages/` | **Bytebot Microservices** | Backend services for agent execution and UI. | NestJS, Prisma |
| `website/` | **Project Website** | Landing page for the ecosystem. | HTML/CSS |
| `kronos-os/` | **Assets** | Pre-built browser extensions and documentation. | - |
| `assets/` | **Brand Assets** | Logos and UI design components. | - |

---

## 🛠 Tech Stack & Tools

*   **Runtimes:** Node.js (v22), Bun (v1.2.14)
*   **Package Managers:** npm, Bun
*   **Backend:** NestJS, Express
*   **Frontend:** Next.js, React, Tailwind CSS 4
*   **Database:** Prisma (ORM), SQLite/PostgreSQL
*   **Automation:** Chrome DevTools Protocol (CDP), MCP (Model Context Protocol)
*   **Virtualization:** Docker, Ubuntu 22.04 with XFCE (for agents)

---

## 🔄 Rebranding Status

The ecosystem is in a transitional state:
*   **Kronbot:** Formerly **Bytebot**. Internal code still largely uses the "Bytebot" name in package IDs and directories.
*   **Kronos Desktop:** Formerly **Factifai**.
*   **BrowserOS:** New branding for the intelligent browser components.

---

## 🚀 Initialization Guide

### 1. Initialize Shared Utilities
Run in `kronbot/packages/shared`:
```bash
npm install
npm run build
```

### 2. Initialize Agent Services
Run in `kronbot/packages/bytebot-agent` and `kronbot/packages/bytebot-agent-cc`:
```bash
npm install
npx prisma generate
```

### 3. Initialize Agent UI and Daemon
Run in `kronbot/packages/bytebot-ui` and `kronbot/packages/bytebotd`:
```bash
npm install
```

### 4. Initialize BrowserOS Agent
Run in `kronbot/kronosOS/packages/browseros-agent`:
```bash
bun install
```

---

## ⚠️ Known Discrepancies

1.  **Empty Directories:** The root-level directories `BrowserOS/`, `EdgyArc-fr/`, and `desktop/` are currently empty placeholders. The actual source for these projects is nested within `kronbot/kronosOS/`.
2.  **Duplicate Names:** `bytebot-agent` and `bytebot-agent-cc` share the same name in their `package.json` files, which may cause issues with automated tools.
3.  **Path Mismatches:** Root-level scripts like `launch_kronos.sh` refer to paths that don't match the current nested structure (e.g., `kron-desktop/backend`).

---

## 📜 Key Documentation

*   **README.md:** Root overview of the Kronos OS ecosystem.
*   **AGENTS.md:** Developer knowledge base and conventions.
*   **GEMINI.md:** Workspace context and status of individual projects.
