# Codebase Overview - Kronos OS / Bytebot

## Project Overview
This monorepo is an AI-driven ecosystem featuring browser automation, desktop agent orchestration, and custom browser experiences. The project has undergone rebranding from "Bytebot" and "Factifai" to "Kronos".

## Active Components

### 1. Kronbot (Agent Orchestration Platform)
- **Location:** `kronbot/`
- **Description:** A platform for managing and orchestrating AI desktop agents.
- **Tech Stack:** NestJS, Next.js, Prisma, Docker, LiteLLM.
- **Packages:**
  - `bytebot-agent`: Core agent service (NestJS).
  - `bytebot-agent-cc`: Agent service with computer control capabilities (NestJS + Claude Code).
  - `bytebot-ui`: Management dashboard (Next.js).
  - `bytebotd`: Daemon service (NestJS).
  - `shared`: Shared utilities and TypeScript types.
  - `bytebot-llm-proxy`: LiteLLM configuration for multi-provider support.

### 2. BrowserOS Agent
- **Location:** `kronbot/kronosOS/packages/browseros-agent/`
- **Description:** A Bun-based MCP (Model Context Protocol) server and Chrome extension for intelligent browser automation.
- **Tech Stack:** Bun, TypeScript, WXT (Web Extension Toolbox), Biome.
- **Sub-projects:**
  - `apps/server`: The MCP server for browser control (Port 9100).
  - `apps/agent`: The browser extension (WXT).
  - `apps/controller-ext`: Bridge for Chrome APIs.
  - `packages/agent-sdk`: SDK for building agents.

### 3. Built Artifacts & Extensions
- **Location:** `kronbot/BrowserOS-agent/`, `kronos-os/built-extensions/`
- **Description:** Contains pre-built Chrome extension artifacts and macOS application wrappers for the browser assistant and controller.

### 4. Browser Sources
- **Location:** `kronbot/kronosOS/packages/browseros/`
- **Description:** Source code and patches for a custom Chromium fork designed for AI interaction.

## Inactive / Placeholder Directories
The following directories are currently empty and serve as placeholders for future development or modular separation:
- `BrowserOS/`
- `EdgyArc-fr/`
- `desktop/`
- `website/` (Contains only a basic `index.html`)

## Environment & Tech Stack
- **Runtimes:** Node.js v22.22.0, Bun v1.2.14.
- **Package Managers:** npm, pnpm, bun.
- **Languages:** TypeScript, JavaScript, Rust (CLI tools), Swift (Browser integration).
- **Database:** Prisma with SQLite/PostgreSQL support.
- **Orchestration:** Docker Compose.

## Key Port Mappings
- **BrowserOS Server:** 9100
- **BrowserOS CDP:** 9000
- **Bytebot Daemon:** 9990
- **Bytebot Agent:** 9991
- **Bytebot UI:** 9992
- **Kronos Desktop Frontend:** 5173
- **Kronos Desktop Backend:** 3001
