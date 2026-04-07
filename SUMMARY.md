# KRONOS-OS Project Overview

## 🏗️ Monorepo Architecture

The repository is organized as a multi-project monorepo containing several independent but interconnected ecosystems for AI-driven browser automation and desktop orchestration.

### 1. Kronbot Ecosystem (`kronbot/`)
The core agent orchestration platform.
- **Location:** `kronbot/packages/`
- **Components:**
  - `shared`: Common utilities and types. (Initialized & Built)
  - `bytebot-agent`: NestJS orchestration service. (Initialized & Prisma Client Generated)
  - `bytebot-ui`: Next.js management interface. (Initialized)
  - `bytebotd`: Desktop daemon for computer control. (Initialized)
  - `bytebot-agent-cc`: Specialized computer control agent. (Initialized)
  - `bytebot-llm-proxy`: Proxy for LLM providers.

### 2. BrowserOS Ecosystem (`kronbot/kronosOS/`)
The browser automation and MCP server layer.
- **Location:** `kronbot/kronosOS/packages/`
- **Components:**
  - `browseros-agent`: Bun-based monorepo containing:
    - `apps/server`: MCP server (Port 9100).
    - `apps/agent`: Chrome extension bridge.
    - `apps/controller-ext`: Controller extension.
    - `packages/agent-sdk`: SDK for agent development.
  - `browseros`: Chromium build resources and configuration.

### 3. Missing/Placeholder Components
Several components mentioned in the root `README.md` are currently not present in the root or are empty directories:
- `void/`: VS Code fork (Missing from root).
- `kron-desktop/`: Desktop app (Missing from root).
- `BrowserOS/`: Empty directory at root (Actual source in `kronbot/kronosOS/`).
- `desktop/`: Empty directory at root.
- `EdgyArc-fr/`: Empty directory at root.

## 🚀 Initialization Status

| Component | Status | Path | Technology |
| :--- | :--- | :--- | :--- |
| `shared` | ✅ Initialized | `kronbot/packages/shared` | TypeScript |
| `bytebot-agent` | ✅ Initialized | `kronbot/packages/bytebot-agent` | NestJS, Prisma |
| `bytebot-ui` | ✅ Initialized | `kronbot/packages/bytebot-ui` | Next.js |
| `bytebotd` | ✅ Initialized | `kronbot/packages/bytebotd` | NestJS |
| `browseros-agent` | ✅ Initialized | `kronbot/kronosOS/packages/browseros-agent` | Bun, TypeScript |

## 🧪 Testing Summary

- **`browseros-agent`**: Core tests for `PageCollector` are passing. Integration tests for SDK and Server currently fail in this environment due to hardcoded macOS paths (expecting `/Applications/BrowserOS.app`) and missing dev-dependencies (e.g., `sinon`).
- **`bytebot-agent` / `bytebotd`**: No unit tests (`.spec.ts`) found in the `src` directories.

## 🔧 Environment Info
- **Node.js**: v22.22.1
- **Bun**: v1.2.14
- **Docker**: v29.1.5 (Docker Compose available)
