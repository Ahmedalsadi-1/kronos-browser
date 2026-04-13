# KRONOS-OS Project Overview

## 🏗️ Repository Structure

This is a multi-project monorepo containing various components of the Kronos intelligent browser ecosystem.

### Active Components (Under `kronbot/`)
- **`packages/shared`**: Core TypeScript utilities and types shared across the ecosystem.
- **`packages/bytebot-agent`**: NestJS-based orchestration agent for AI workflows. (Initialized with Prisma Client v6.16.1)
- **`packages/bytebot-ui`**: Next.js-based management dashboard for agents. (Build verified)
- **`packages/bytebot-agent-cc`**: Likely a secondary or legacy version of the agent orchestration service.
- **`packages/bytebotd`**: Desktop daemon for the agent system.
- **`kronosOS/packages/browseros`**: Custom Chromium fork build configuration and patches.
- **`kronosOS/packages/browseros-agent`**: Bun-based MCP server and agent-sdk for browser automation.

### Artifacts & Extensions
- **`kronos-os/built-extensions/`**: Pre-compiled browser extension artifacts.
- **`kronbot/BrowserOS-agent/`**: Built extension for BrowserOS.

### Root Placeholders (Empty)
- **`BrowserOS/`**, **`EdgyArc-fr/`**, **`desktop/`**: Currently empty directories at the root. Active code for these seems to have moved or resides within `kronbot/`.

### Missing Components (Referenced in Docs)
- **`void`**: VS Code fork mentioned in `README.md` but not present in the current filesystem.
- **`kron-desktop`**: Desktop application mentioned in `README.md` and `launch_kronos.sh` but missing from the repository root.

## 🚀 Initialization Status

1. **`@bytebot/shared`**: Successfully built. All dependencies installed.
2. **`bytebot-agent`**: Dependencies installed and Prisma client generated.
3. **`bytebot-ui`**: Dependencies installed and production build verified (fixed minor linting issues in `Header.tsx`).
4. **`browseros-agent`**: Dependencies installed using Bun. Baseline tests (`page-collector.test.ts`) passing.

## 🔧 Environment Details
- **Node.js**: v22.22.1
- **npm**: v11.11.0
- **Bun**: v1.2.14
- **Ports**:
  - `9100`: BrowserOS Server (MCP)
  - `9000`: BrowserOS CDP
  - `9300`: BrowserOS Extension WS
  - `9992`: Bytebot UI
  - `9991`: Bytebot Agent
