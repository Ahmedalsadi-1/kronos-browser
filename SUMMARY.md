# Kronos OS Ecosystem Summary

## 🏗️ Architecture Overview

The **Kronos OS** project is a sophisticated monorepo containing multiple AI-driven automation tools, browser forks, and management platforms.

### Core Components

1.  **Kronbot (Kronos Agent)**:
    - **Location**: `kronbot/`
    - **Technology**: NestJS (Backend), Next.js (UI), Prisma (ORM), Docker.
    - **Purpose**: AI desktop agent orchestration platform with a virtual Linux desktop environment.
    - **Key Services**:
        - `bytebot-agent`: The brain, coordinating LLMs and tasks.
        - `bytebot-ui`: Management interface for tasks and desktop view.
        - `bytebotd`: Desktop daemon for computer control.
        - `shared`: Common types and utilities.

2.  **BrowserOS Agent**:
    - **Location**: `kronbot/kronosOS/packages/browseros-agent/`
    - **Technology**: Bun, TypeScript, Hono, WXT (Web Extension Toolbox).
    - **Purpose**: Intelligent browser automation using Model Context Protocol (MCP) and Chrome DevTools Protocol (CDP).
    - **Key Services**:
        - `apps/server`: MCP server and agent loop.
        - `apps/agent`: Chat interface (Chrome extension).
        - `apps/controller-ext`: Bridge for `chrome.*` APIs.

3.  **Kronos-OS Extensions & UI**:
    - **Location**: `kronos-os/built-extensions/`
    - **Contents**: Pre-built browser extensions and desktop integration tools.

4.  **Placeholder/Inactive Directories**:
    - `BrowserOS/`, `EdgyArc-fr/`, `desktop/`: Currently empty placeholders or uninitialized submodules.
    - `website/`: Basic landing page (`index.html`).

## 🛠️ Initialization Status

The following packages have been successfully initialized (dependencies installed and build artifacts generated):

- [x] **`kronbot/packages/shared`**: Built successfully (`dist/` created).
- [x] **`kronbot/packages/bytebot-agent`**: Dependencies installed and Prisma client generated.
- [x] **`kronbot/packages/bytebot-ui`**: Dependencies installed.
- [x] **`kronbot/kronosOS/packages/browseros-agent`**: Initialized using Bun; `agent-sdk` built successfully.

## 🧪 Testing Findings

- **BrowserOS Agent**: Unit tests (e.g., `page-collector.test.ts`) are passing. Integration tests currently fail in this environment due to hardcoded macOS binary paths (`/Applications/BrowserOS.app`).
- **Kronbot Agent**: No unit tests found in the current state of `bytebot-agent`.
- **Shared**: No test suite defined.

## 🚦 Integration Points

- **Ports**:
    - **9100**: BrowserOS Server (MCP/Chat).
    - **9000**: Chromium CDP.
    - **9300**: Controller Extension WebSocket.
    - **9990**: Kronbot Desktop (VNC/Daemon).
    - **9991**: Kronbot Agent API.
    - **9992**: Kronbot UI.

- **Dependencies**:
    - The `kronbot` ecosystem relies heavily on the `@bytebot/shared` package.
    - `browseros-agent` is a standalone Bun-based monorepo.

## 📝 Developer Notes

- Always build `kronbot/packages/shared` before working on other `kronbot` services.
- `bun` is strictly required for `browseros-agent`.
- `npx prisma generate` is required for `bytebot-agent` after any schema changes.
- Use `launch_kronos.sh` as the primary entry point for starting the full ecosystem (requires Docker).
