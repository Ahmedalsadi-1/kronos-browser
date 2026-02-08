# Kronos OS Codebase Overview

This document provides a summary of the Kronos OS monorepo structure, services, and current status as of Jan 2026.

## 📁 Repository Structure

The repository is organized as a monorepo, with the primary active development concentrated in the `kronbot/` directory.

### 🟢 Active Directories
- **`kronbot/`**: The core of the ecosystem.
  - **`packages/`**: Contains microservices for the agent platform.
    - `shared`: Shared utilities and types.
    - `bytebot-agent`: NestJS backend for AI agent management.
    - `bytebot-ui`: Next.js frontend for the agent UI.
    - `bytebotd`: NestJS daemon for computer control.
    - `bytebot-llm-proxy`: LiteLLM-based proxy for LLM orchestration.
  - **`kronosOS/packages/browseros-agent/`**:
    - `apps/server`: Bun-based MCP server for browser automation.
    - `packages/agent-sdk`: SDK for building agents.
- **`assets/`**: Logos and UI assets.
- **`kronos-os/built-extensions/`**: Pre-built browser extensions for Safari.
- **`website/`**: Project website (currently a single `index.html`).

### ⚪ Placeholder Directories (Empty)
- `BrowserOS/`
- `EdgyArc-fr/`
- `desktop/`

## 🚀 Services & Ports

| Service | Port | Technology | Entry Point |
| :--- | :--- | :--- | :--- |
| **bytebot-agent** | 9991 | NestJS | `kronbot/packages/bytebot-agent/src/main.ts` |
| **bytebot-ui** | 9992 | Next.js | `kronbot/packages/bytebot-ui/server.ts` |
| **bytebotd** | 9990 | NestJS | `kronbot/packages/bytebotd/src/main.ts` |
| **BrowserOS Server** | 9100 | Bun/Hono | `kronbot/kronosOS/packages/browseros-agent/apps/server/src/index.ts` |
| **BrowserOS CDP** | 9000 | CDP | - |
| **BrowserOS Extension**| 9300 | WebSocket| - |

## 🛠 Initialization Status

The following initialization steps have been performed:
1.  **@bytebot/shared**: Built successfully (`dist/index.js` generated).
2.  **bytebot-agent**: Dependencies installed and Prisma client generated.
3.  **bytebot-ui & bytebotd**: Dependencies installed.
4.  **browseros-agent**: Dependencies installed via Bun.

## 🧪 Testing

Integrity tests for the `browseros-agent` server have been verified:
- `bun test tests/common/page-collector.test.ts` passes with 5/5 tests.

## 🎨 Theme Information

The project uses a "Cosmic Indigo" theme:
- **Primary Color**: `#4F46E5` (Indigo-600)
- **Background**: `#09090B` (Zinc-950)
- **Surface**: `#18181B` (Zinc-900)
