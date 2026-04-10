# KRONOS-OS Project Overview

## Repository Structure
The repository is a multi-project monorepo focused on AI-driven browser and desktop automation.

### Core Components
1. **Kronbot (Kronos Agent)**: Found in `kronbot/`. An agent orchestration platform.
   - `bytebot-agent`: NestJS service for coordinating AI actions.
   - `bytebot-ui`: Next.js frontend for management and task monitoring.
   - `bytebotd`: Virtual desktop service (Dockerized Ubuntu/XFCE).
   - `shared`: Common utilities and types used across kronbot packages.
2. **BrowserOS Agent**: Found in `kronbot/kronosOS/packages/browseros-agent/`.
   - Bun-based MCP server and browser automation tools.
   - Includes an `agent-sdk` for building agents.
3. **BrowserOS**: Found in `kronbot/kronosOS/packages/browseros/`.
   - Resources for a customized Chromium fork.

### Missing/Empty Components (Mentioned in Docs)
- **Void (Kronos Editor)**: Mentioned in README/GEMINI.md but not present in the root.
- **Kron-desktop**: Mentioned but missing from the root.
- **Kronos Browser**: Zen Browser fork mentioned but missing from the root.
- **Empty Directories**: `BrowserOS/`, `desktop/`, and `EdgyArc-fr/` at the root are currently empty.

## Initialization Status
- **Kronbot Shared**: Initialized and built.
- **Kronbot Agent**: Initialized, built, and Prisma client generated.
- **Kronbot UI**: Initialized and built (requires `BYTEBOT_AGENT_BASE_URL` and `BYTEBOT_DESKTOP_VNC_URL` in `.env`).
- **Kronbot Desktop Service (bytebotd)**: Initialized and built.
- **BrowserOS Agent**: Initialized via `bun install`, SDK artifacts built.

## Network Ports
- **bytebotd**: 9990 (Service & noVNC)
- **bytebot-agent**: 9991
- **bytebot-ui**: 9992
- **BrowserOS Server**: 9100
- **BrowserOS CDP**: 9000
- **BrowserOS Extension**: 9300
