# Kronos Ecosystem Summary

## 🏗️ Codebase Architecture

The Kronos-OS repository is a multi-project monorepo designed for AI-powered browser and desktop automation.

### Core Components

1. **Orchestration Agent (`kronbot/packages/bytebot-agent`)**
   - **Tech:** NestJS, Prisma, TypeScript.
   - **Role:** Coordinates AI workflows and manages tasks.
   - **Status:** Initialized and Build verified.

2. **Management UI (`kronbot/packages/bytebot-ui`)**
   - **Tech:** Next.js (App Router), Tailwind CSS 4, Hugeicons.
   - **Role:** Web interface for monitoring and managing agents.
   - **Status:** Initialized and Build verified (after lint fix).

3. **BrowserOS Agent (`kronbot/kronosOS/packages/browseros-agent`)**
   - **Tech:** Bun, WXT (Web Extension Toolbox), TypeScript.
   - **Role:** MCP server and Chrome extension for deep browser interaction.
   - **Status:** Initialized (Bun) and basic tests passing.

4. **Shared Package (`kronbot/packages/shared`)**
   - **Role:** Common utilities and types used by all `kronbot` services.
   - **Status:** Built and ready.

### 📁 Directory Mapping

| Directory | Content | Note |
|-----------|---------|------|
| `kronbot/` | Main project root | Contains the active microservices. |
| `kronbot/packages/` | Backend & UI services | `bytebot-agent`, `bytebot-ui`, etc. |
| `kronbot/kronosOS/` | Browser-specific logic | Contains `browseros-agent` and Chromium-related files. |
| `BrowserOS/`, `desktop/`, `EdgyArc-fr/` | Placeholders | Currently empty at root; logic moved to `kronbot/`. |
| `website/` | Project landing page | Simple HTML/JS site. |

## 🚀 Initialization Status

| Step | Action Taken | Result |
|------|--------------|--------|
| **Shared** | `npm install && npm run build` | ✅ Success |
| **Agent** | `npm install && npx prisma generate` | ✅ Success |
| **UI** | `npm install && fixed lint && npm run build` | ✅ Success |
| **BrowserOS Agent** | `bun install && setup .env.development` | ✅ Success |
| **Testing** | `bun test` in BrowserOS Server | ⚠️ Unit tests Pass / Integration Fail (MacOS binary path required) |

## ⚠️ Known Issues / Observations

- **Environment Mismatch:** `launch_kronos.sh` and some tests are configured for macOS (using `osascript` and `/Applications/...` paths), but the current environment is Linux.
- **Legacy Naming:** The codebase is in transition from "Bytebot" to "Kronos". Both names appear frequently in the directory structure and configuration.
- **Missing "Void":** Documentation refers to an AI-powered VS Code fork (`void`), but it is not present in the current directory structure.
