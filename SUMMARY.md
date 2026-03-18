# KRONOS-OS Project Overview

Initialized on: 2026-01-20

## 📂 Codebase Structure

The Kronos-OS ecosystem is a multi-project monorepo focused on AI-driven browser automation and desktop orchestration.

### 1. BrowserOS
Located at `kronbot/kronosOS/packages/browseros-agent/`.
- **Core components**: MCP server, Chrome extension bridge, and agent-sdk.
- **Tech Stack**: Bun, TypeScript.
- **Purpose**: Intelligent browser automation and control.

### 2. Kronbot (AI Agent Orchestration)
Located at `kronbot/`.
- **Packages**:
  - `shared`: Common utilities and types.
  - `bytebot-agent`: NestJS backend agent.
  - `bytebot-agent-cc`: Specialized agent with Computer Control capabilities.
  - `bytebot-ui`: Next.js frontend management dashboard.
  - `bytebotd`: Background daemon service.
- **Tech Stack**: Node.js, NestJS, Next.js, Prisma, Docker.
- **Purpose**: Orchestrating AI workflows and managing multi-agent systems.

### 3. Missing or Placeholder Directories
- `BrowserOS/`, `EdgyArc-fr/`, `desktop/`: Currently empty placeholder directories.
- `website/`: Basic landing page placeholder.

## 🚀 Initialization Status

The following steps have been completed to initialize the development environment:

- ✅ **Shared Utilities**: Built `@bytebot/shared` package.
- ✅ **Database Clients**: Generated Prisma clients for `bytebot-agent` and `bytebot-agent-cc`.
- ✅ **Dependencies**: Installed all npm/bun dependencies for core services.
- ✅ **Agent SDK**: Built the `@browseros-ai/agent-sdk`.
- ✅ **Verification**: Baseline tests for BrowserOS server were executed and passed.

## 🛠 Command Reference

### BrowserOS (Bun required)
```bash
cd kronbot/kronosOS/packages/browseros-agent
bun install
bun test apps/server/tests/common/page-collector.test.ts
```

### Kronbot (npm required)
```bash
cd kronbot/packages/shared && npm run build
cd kronbot/packages/bytebot-ui && npm run dev
```
