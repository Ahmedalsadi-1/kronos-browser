# KRONOS-OS Project Overview

## 🏗️ Architecture & Component Mapping

The repository is a complex monorepo containing several distinct projects under the `kronbot/` directory.

### 1. **Kronos Agent (Kronbot)**
Located in `kronbot/packages/`, this is the core orchestration platform.

- **`bytebot-agent`**: NestJS-based orchestration agent (Port 9991).
- **`bytebot-agent-cc`**: Another variant or version of the agent, also NestJS-based.
- **`bytebot-ui`**: Next.js-based management dashboard (Port 9992).
- **`bytebotd`**: NestJS-based daemon for system-level interactions (Port 9990).
- **`shared`**: Shared TypeScript utilities and types used by all `bytebot-*` packages.

### 2. **BrowserOS Ecosystem**
Located in `kronbot/kronosOS/packages/` and `kronbot/BrowserOS-agent/`.

- **`browseros-agent`**: A Bun-powered monorepo:
    - `apps/server`: MCP server and browser control logic (@kronos/server).
    - `apps/agent`: WXT/React-based browser extension (@kronos/assistant).
    - `packages/agent-sdk`: SDK for building agents.
- **`browseros`**: Chromium build configuration and patches for the custom browser.
- **`BrowserOS-agent`** (Root): Contains pre-built artifacts of the browser extension.

### 3. **Infrastructure & Other**
- **`docker/`**: Contains `docker-compose.yml` for running the entire ecosystem.
- **`Agentic-Browser-Extension/`**: Currently an empty placeholder.
- **`BrowserOS/`, `EdgyArc-fr/`, `desktop/`** (Root): Currently empty placeholder directories.
- **`void/` & `kron-desktop/`**: Referenced in README but currently missing from the repository.

## 🛠️ Technology Stack

- **Runtimes**: Node.js (v22), Bun (v1.2).
- **Frameworks**: NestJS, Next.js, React, Hono.
- **Languages**: TypeScript, JavaScript.
- **Database**: Prisma (SQLite/Postgres).
- **Build Tools**: npm, bun, tsc, wxt, webpack.

## 🚀 Initialization Status

The following components have been successfully initialized and verified:

| Component | Status | Verification |
|-----------|--------|--------------|
| `shared` | ✅ Built | `dist/` created |
| `bytebot-agent` | ✅ Initialized | Prisma client generated |
| `bytebot-agent-cc`| ✅ Initialized | Prisma client generated |
| `bytebot-ui` | ✅ Built | Next.js build success |
| `bytebotd` | ✅ Built | `dist/` created |
| `agent-sdk` | ✅ Built | `dist/` created |
| `@kronos/server` | ✅ Verified | Baseline tests passing |

## 🔧 Fixes Applied

1. **`bytebot-ui`**: Fixed a linting error in `Header.tsx` where `resolvedTheme` was unused, which was blocking the production build.
2. **`browseros-agent`**: Fixed script filters in `package.json` that were using incorrect package names (`@browseros/server` -> `@kronos/server`).
