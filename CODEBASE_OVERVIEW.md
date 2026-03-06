# Kronos OS Codebase Overview

This document provides a comprehensive overview of the Kronos OS monorepo, its architecture, projects, and initialized state.

## 🏗 High-Level Architecture

Kronos OS is an intelligent browser and desktop automation ecosystem. It integrates browser-native AI (BrowserOS), desktop agent orchestration (Kronbot/Bytebot), and an AI-enhanced code editor (Void).

### Primary Projects

| Project | Path | Role | Tech Stack |
| :--- | :--- | :--- | :--- |
| **Kronbot (Bytebot)** | `kronbot/` | AI Desktop Agent Platform | NestJS, Next.js, Docker, Prisma |
| **BrowserOS Agent** | `kronbot/kronosOS/packages/browseros-agent/` | Bun MCP Server for Browser Automation | Bun, TypeScript, Hono |
| **BrowserOS Chromium** | `kronbot/kronosOS/packages/browseros/` | Customized Chromium Fork | C++, Python (patches) |
| **Kronos Desktop** | `kron-desktop/` (Ref'd in scripts) | Desktop UI/Backend | React, Express |
| **Void** | `void/` (Ref'd in docs) | AI-powered Code Editor | TypeScript, Electron |

## 📂 Detailed Directory Structure

- **`kronbot/`**: The core of the current active development.
    - **`packages/shared/`**: Common types and utilities. **Initialized and Built.**
    - **`packages/bytebot-agent/`**: The primary AI agent service. **Initialized with Prisma.**
    - **`packages/bytebot-agent-cc/`**: Agent with Claude Computer Control support. **Initialized.**
    - **`packages/bytebot-ui/`**: Next.js web interface (Port 9992). **Initialized.**
    - **`packages/bytebotd/`**: Desktop daemon for virtual environment control (Port 9990). **Initialized.**
    - **`docker/`**: Orchestration scripts for the entire Bytebot stack.
- **`kronbot/kronosOS/`**: Contains the BrowserOS ecosystem.
    - **`packages/browseros-agent/`**: A monorepo for the MCP server and browser extensions. **Initialized with Bun.**
    - **`packages/browseros/`**: Build scripts and patches for the Chromium fork.
- **`assets/`**: Logos, banners, and UI assets for the ecosystem.
- **`website/`**: Landing page placeholder (`index.html`).
- **`kronos-os/built-extensions/`**: Pre-compiled browser extension artifacts for Safari and Chrome.

## ⚙️ Initialization Status

The following steps have been performed to prepare the environment:

1.  **Shared Library**: `kronbot/packages/shared` has been built, generating the `dist/` folder required by other services.
2.  **Bytebot Services**: `npm install` and `npx prisma generate` have been executed for all NestJS services.
3.  **BrowserOS Agent**: `bun install` has been completed, which also built the `agent-sdk`.
4.  **Configuration**: A `.env.development` template has been created for the BrowserOS server.
5.  **Health Checks**: Basic tests in the BrowserOS server (`page-collector.test.ts`) have been verified to pass.

## 🚦 Service Map (Default Ports)

- **9992**: Bytebot Web UI
- **9991**: Bytebot Agent API
- **9990**: Bytebot Desktop Daemon / noVNC
- **9100**: BrowserOS MCP Server
- **9000**: BrowserOS CDP Connection
- **5173**: Kronos Desktop Frontend
- **3001**: Kronos Desktop Backend

## ⚠️ Notes & Observations

- **Placeholder Directories**: `BrowserOS/`, `EdgyArc-fr/`, and `desktop/` at the root are currently empty placeholders. The actual source for BrowserOS is located within `kronbot/kronosOS/`.
- **Rebranding**: The codebase is in the process of rebranding from `Bytebot` to `Kronbot` and `Factifai` to `Kronos Desktop`.
- **Build Artifacts**: Pre-built extension artifacts are available in `kronbot/BrowserOS-agent/` and `kronos-os/built-extensions/`.
