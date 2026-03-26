# KRONOS-OS Project Overview

## Repository Structure
This monorepo contains several distinct yet related projects focused on AI-powered browser automation and desktop orchestration.

### Active Projects
- **kronbot/**: An AI agent orchestration platform for desktop automation. It includes:
  - `bytebot-agent`: The core NestJS service for coordinating AI agents and LLMs.
  - `bytebot-agent-cc`: A specialized version for computer control.
  - `bytebotd`: A daemon for handling low-level computer actions and input tracking.
  - `bytebot-ui`: A Next.js web application for task management and remote desktop viewing.
  - `shared`: Common utilities and TypeScript definitions shared across all kronbot packages.
- **kronbot/kronosOS/packages/browseros-agent/**: A browser automation agent that includes:
  - `apps/server`: A Bun-based MCP server for browser control.
  - `apps/agent`: A Chrome extension for the agent's user interface.
  - `apps/controller-ext`: A Chrome extension acting as a bridge to browser APIs.
  - `packages/agent-sdk`: An SDK for building browser-based agents.
- **built-extensions/**: Pre-built artifacts for BrowserOS Controller and Assistant extensions.
- **website/**: A landing page or placeholder for the project's website.

### Missing or Placeholder Projects
- **void/**: Mentioned in documentation as "Kronos Editor" (a VS Code fork), but the directory is currently missing or empty at the root.
- **kron-desktop/**: Mentioned as a desktop application with React + NextUI, but also missing at the root.
- **BrowserOS/**, **EdgyArc-fr/**, **desktop/**: These root-level directories are currently empty.

## Rebranding Status
The project is undergoing a rebranding from **Bytebot/Factifai** to **Kronos**. While documentation and root-level scripts use the "Kronos" name, internal package names and directories within the `kronbot/` project still use the "Bytebot" terminology.

## Technical Specifications
- **Runtimes**: Node.js (v22.2), Bun (v1.2)
- **Frameworks**: NestJS (backend), Next.js (frontend), Hono (BrowserOS server)
- **Automation**: CDP (Chrome DevTools Protocol), nut.js (computer control)
- **Database**: Prisma (ORM) with SQLite/PostgreSQL
- **Package Management**: npm for `kronbot`, Bun for `browseros-agent`

## Initialization Status
The following components have been initialized:
1. **kronbot/packages/shared**: Dependencies installed and project built (`dist/` generated).
2. **kronbot/packages/bytebot-agent**: Dependencies installed and Prisma client generated.
3. **kronbot/packages/bytebot-agent-cc**: Dependencies installed and Prisma client generated.
4. **kronbot/packages/bytebotd**: Dependencies installed.
5. **kronbot/packages/bytebot-ui**: Dependencies installed.
6. **kronbot/kronosOS/packages/browseros-agent**: Dependencies installed and agent-sdk built.

## Verification
- Basic operational stability for the BrowserOS Agent was verified by running unit tests for the page collector.
- Successful builds and Prisma generation were confirmed for all kronbot backend services.
