# Kronos OS Codebase Summary

This document provides an overview of the Kronos OS monorepo, its architecture, components, and current state as of April 2026.

## 🏗️ Architecture Overview

The codebase is organized into several major components, many of which are undergoing rebranding from "Bytebot" or "Factifai" to "Kronos".

### 1. Kronbot (Agent Orchestration) - `kronbot/`
- **Location:** `kronbot/`
- **Purpose:** The core platform for orchestrating AI agents.
- **Components:**
  - `packages/bytebot-agent`: NestJS-based orchestration agent.
  - `packages/bytebot-ui`: Next.js management UI.
  - `packages/shared`: Shared utilities and types.
  - `packages/bytebotd`: Desktop daemon service.
  - `packages/bytebot-agent-cc`: Alternative agent implementation.
- **Tech Stack:** Node.js, TypeScript, NestJS, Next.js, Prisma, Docker.

### 2. BrowserOS (Intelligent Browser) - `kronbot/kronosOS/`
- **Location:** `kronbot/kronosOS/`
- **Purpose:** A Chromium fork designed for AI agent integration.
- **Components:**
  - `browseros`: The Chromium engine (managed via `uv`).
  - `browseros-agent`: Bun-based MCP server and extension bridge.
- **Tech Stack:** Bun, TypeScript, Python (for build scripts).

### 3. Missing/Empty Components
The following components are mentioned in the root `README.md` but are currently missing or empty at the root directory:
- **Void (VS Code Fork):** Missing `void/` directory (referred to as Kronos Editor).
- **Kronos Desktop:** Root `desktop/` directory is empty.
- **EdgyArc-fr:** Root `EdgyArc-fr/` directory is empty.
- **BrowserOS (Root):** Root `BrowserOS/` directory is empty (active development is in `kronbot/kronosOS/packages/browseros`).

## 🚀 Initialization Status

The following components have been successfully initialized and built:
- ✅ `@bytebot/shared`: Built successfully in `kronbot/packages/shared`.
- ✅ `@browseros-ai/agent-sdk`: Built successfully in `kronbot/kronosOS/packages/browseros-agent/packages/agent-sdk`.
- ✅ `browseros-agent` Server: Dependencies installed and smoke tests passed in `kronbot/kronosOS/packages/browseros-agent/apps/server`.

## 🛠️ Commands & Usage

### Kronbot Services
```bash
cd kronbot
docker-compose -f docker/docker-compose.yml up -d
```

### BrowserOS Agent
```bash
cd kronbot/kronosOS/packages/browseros-agent
bun run start:server
```

## ⚠️ Known Issues & Discrepancies
- **Rebranding:** Many internal packages still use the `bytebot` prefix despite the project-wide shift to `kronos`.
- **Missing Source:** Several projects listed in the root `README.md` are not present in the current repository state.
- **Test Failures:** Some unit tests in `agent-sdk` are currently failing, likely due to environment mismatches or pre-existing bugs in the mock implementation.
