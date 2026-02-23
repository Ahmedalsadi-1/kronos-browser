# Codebase Initialization Report - Jan 2026

## Overview
This repository is a complex monorepo comprising several projects focused on AI-driven browsing and desktop automation. The main active development appears to be centered within the `kronbot/` directory.

## Project Structure

### 1. Kronbot (formerly Bytebot)
Located in `kronbot/`, this is an AI agent orchestration platform.
- **Packages (`kronbot/packages/`):**
    - `shared`: Common types and utilities. (Initialized & Built)
    - `bytebot-agent`: NestJS AI agent service. (Initialized with Prisma)
    - `bytebot-agent-cc`: Computer control agent with Claude Code integration. (Initialized with Prisma)
    - `bytebotd`: NestJS desktop daemon for computer control. (Initialized)
    - `bytebot-ui`: Next.js web interface. (Initialized)
    - `bytebot-llm-proxy`: LiteLLM orchestration (non-standard package).

### 2. BrowserOS Agent
Located in `kronbot/kronosOS/packages/browseros-agent/`.
- **Apps:**
    - `server`: Bun-based MCP server (port 9100).
    - `agent`: Chrome extension bridge.
    - `controller-ext`: Controller extension.
- **Packages:**
    - `agent-sdk`: SDK for agent development. (Initialized & Built)
    - `shared`: Shared constants and utilities.

### 3. Chromium Fork (BrowserOS)
Located in `kronbot/kronosOS/packages/browseros/`.
Contains patches and build configurations for a specialized Chromium browser.

### 4. Other Directories (Placeholders/Missing)
The following directories in the root are currently empty or missing the expected content based on documentation:
- `BrowserOS/`: Empty.
- `desktop/`: Empty (Expected: Kronos Desktop / Factifai).
- `EdgyArc-fr/`: Empty.
- `void/`: Missing from root (Expected: Kronos Editor / VS Code fork).
- `kronos-os/built-extensions/`: Empty.

## Initialization Status
The following components have been successfully initialized:
- [x] `kronbot/packages/shared`: Installed and Built.
- [x] `kronbot/packages/bytebot-agent`: Installed, Prisma Client generated.
- [x] `kronbot/packages/bytebot-agent-cc`: Installed, Prisma Client generated.
- [x] `kronbot/packages/bytebot-ui`: Installed.
- [x] `kronbot/packages/bytebotd`: Installed.
- [x] `kronbot/kronosOS/packages/browseros-agent`: Installed via Bun, `agent-sdk` built.

## Verification & Testing
- **Server Tests**: `apps/server` tests for `PageCollector` passed (5/5).
- **SDK Tests**: `packages/agent-sdk` tests in `agent.test.ts` have 8 failures related to event length expectations. These are known pre-existing issues.
- **Environment**: Node.js v22.22.0, Bun v1.2.14, Docker v29.1.5, Docker Compose v5.0.1.

## Observations
- **Rebranding**: Significant rebranding from Bytebot/Factifai to Kronos is ongoing. Documentation (`README.md`, `GEMINI.md`) often refers to root-level directories that have been moved to `kronbot/` or are currently missing.
- **Launch Script**: `launch_kronos.sh` in the root expects a directory structure that does not match the current state (e.g., it looks for `BrowserOS-agent` and `kron-desktop` in the root).
- **Submodules**: `kronbot/kronosOS` uses submodules for `browseros-agent`.
