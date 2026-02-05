# Kronos OS Codebase Overview

This document provides a comprehensive overview of the `kronos-os` monorepo based on the initialization and exploration performed on Feb 5, 2026.

## 🚀 Projects and Locations

The monorepo contains several AI-driven projects, though some are nested differently than suggested by the root documentation.

### 1. Bytebot (Kronos Agent)
- **Location:** `kronbot/`
- **Description:** An open-source AI desktop agent orchestration platform. It provides a virtual Linux desktop environment that AI agents can control.
- **Key Services (`kronbot/packages/`):**
  - `bytebot-agent`: NestJS AI agent service for orchestration and LLM coordination.
  - `bytebot-ui`: Next.js web UI for task management and viewing the virtual desktop.
  - `bytebotd`: NestJS desktop daemon for computer control and input tracking.
  - `bytebot-agent-cc`: Computer control agent integration.
  - `shared`: Shared TypeScript types and utilities.
- **Tech Stack:** NestJS, Next.js, Prisma (PostgreSQL), Docker, Ubuntu (XFCE).

### 2. BrowserOS (Kronos Browser Agent)
- **Location:** `kronbot/kronosOS/packages/browseros-agent/`
- **Description:** A Bun-based MCP (Model Context Protocol) server for browser automation.
- **Components:**
  - `apps/server`: The MCP server (port 9100).
  - `apps/agent`: Chrome extension for the agent UI.
  - `apps/controller-ext`: Chrome extension for bridging `chrome.*` APIs.
- **Tech Stack:** Bun, TypeScript, Hono.

### 3. Chromium Fork (Kronos OS Engine)
- **Location:** `kronbot/kronosOS/`
- **Description:** A specialized fork of Chromium (based on ungoogled-chromium) designed to run AI agents natively.

## 🏗️ Monorepo Structure

The physical directory structure is as follows:

```
.
├── kronbot/                # Main project container
│   ├── packages/           # Bytebot microservices
│   └── kronosOS/           # BrowserOS (Chromium fork + Agent)
│       └── packages/
│           └── browseros-agent/
├── kronos-os/              # Contains built-extensions/
├── assets/                 # UI assets and logos
├── BrowserOS/              # Empty placeholder
├── EdgyArc-fr/             # Empty placeholder
├── desktop/                # Empty placeholder
└── website/                # Minimal placeholder (index.html)
```

## 🛠️ Initialization Status

The following packages have been initialized:
- `kronbot/packages/shared`: Built successfully.
- `kronbot/packages/bytebot-agent`: Dependencies installed and Prisma client generated.
- `kronbot/packages/bytebot-ui`: Dependencies installed.
- `kronbot/packages/bytebotd`: Dependencies installed.
- `kronbot/kronosOS/packages/browseros-agent`: Dependencies installed via Bun.

## ⚠️ Observations and Discrepancies

1. **Missing Projects:** The root `README.md` mentions `void` (AI code editor) and `kron-desktop` as separate root directories, but they are currently missing or relocated.
2. **Empty Placeholders:** Several root directories (`BrowserOS`, `EdgyArc-fr`, `desktop`) are currently empty.
3. **Environment Requirements:**
   - `browseros-agent` tests require a macOS environment to spawn the specialized `BrowserOS.app`.
   - `bytebot-agent` requires a PostgreSQL database (orchestrated via Docker in `kronbot/docker/`).
4. **Build Order:** `shared` must always be built before other Bytebot services.

## 📊 Port Map

- **9990:** bytebotd
- **9991:** bytebot-agent
- **9992:** bytebot-ui
- **9100:** BrowserOS Server (MCP)
- **9000:** BrowserOS CDP
- **9300:** BrowserOS Controller Extension
- **5432:** PostgreSQL
