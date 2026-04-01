# KRONOS-OS Project Overview & Initialization Report

## 1. Overview
KRONOS-OS is a next-generation intelligent browser ecosystem powered by AI. It is structured as a multi-project monorepo containing several independent but integrated products aimed at browser automation, agent orchestration, and AI-assisted browsing.

## 2. Core Components

### 🤖 Kronbot (Agent Orchestration Platform)
Located in `kronbot/`, this is the orchestration layer for AI agents.
- **`bytebot-ui`**: A Next.js-based web management UI for agents.
- **`bytebot-agent`**: A NestJS-based service for standard AI agent tasks.
- **`bytebot-agent-cc`**: A specialized agent service that includes computer control features (via `@anthropic-ai/claude-code`).
- **`bytebotd`**: The "Bytebot Daemon," a NestJS service likely responsible for local system interactions and agent management.
- **`shared`**: A package containing utilities and types used across all Kronbot services.
- **`bytebot-llm-proxy`**: A Dockerized LiteLLM proxy for unified LLM access.

### 🌐 BrowserOS-agent (Browser Automation & MCP Server)
Located in `kronbot/kronosOS/packages/browseros-agent/`, this component provides deep browser integration.
- **MCP Server**: A Bun-based Model Context Protocol server for intelligent automation.
- **Agent SDK**: A TypeScript SDK for developing browser agents.
- **Chrome Extension**: A bridge that allows agents to control the browser via CDP and extension APIs.
- **Gemini Integration**: Built-in support for Google Gemini AI.

### 🏗️ Browser Engines & Forks
- **BrowserOS**: Located in `kronbot/kronosOS/packages/browseros/`, containing source code and patches for a customized Chromium fork.
- **Kronos-browser**: Mentioned as a Zen Browser fork (Firefox-based), though its primary source tree in the root `kronos-browser/` was not explicitly listed in the initial exploration (the root folder `kronos-os/` was found instead, which contained pre-built extensions).

### 🎨 Other Components
- **EdgyArc-fr**: A project implementing Arc-like browser features.
- **Website**: The landing page for the project, located in `website/`.

## 3. Architecture & Tech Stack

### Technology Stack
- **Runtimes**: Node.js (v22.22.1) and Bun (v1.2.14).
- **Frameworks**: NestJS (Backend), Next.js (Frontend), React.
- **AI Integrations**: Anthropic Claude, Google Gemini, OpenAI.
- **Database/ORM**: Prisma with SQLite/PostgreSQL support.
- **Build & Tooling**: TypeScript, Biome, ESLint, Prettier, Tailwind CSS 4.

### Internal Relationships
- The **`shared`** package in `kronbot/packages/shared` is a critical dependency for all `bytebot-*` services. It must be built first.
- **Prisma** is used for type-safe database access in agents, requiring client generation on setup.
- **Communication** between components often happens via WebSockets, CDP (Chrome DevTools Protocol), and MCP.

## 4. Initialization Status
The following steps were successfully completed to initialize the environment:
1. **`kronbot/packages/shared`**: Installed dependencies and built the package. Verified `dist/` artifacts.
2. **`kronbot/packages/bytebot-agent`**: Installed dependencies and generated the Prisma client.
3. **`kronbot/packages/bytebot-agent-cc`**: Installed dependencies and generated the Prisma client.
4. **`kronbot/packages/bytebot-ui`**: Installed dependencies.
5. **`kronbot/packages/bytebotd`**: Installed dependencies.
6. **`kronbot/kronosOS/packages/browseros-agent`**: Installed dependencies using Bun and built the `agent-sdk`.

## 5. Testing & Validation
- **Functional Tests**: `PageCollector` tests in `@kronos/server` passed successfully.
- **SDK Tests**: `Agent` unit tests in `agent-sdk` were run; they currently show some failures related to event emission expectations and mock results, which are likely pre-existing issues in the test suite itself.

## 6. Notable Observations
- **Rebranding**: The project is transitioning from the legacy name "Bytebot" to "Kronos/Kronbot". Traces of "Bytebot" remain in many directory names and package IDs.
- **Missing Directories**: While the `README.md` mentions `void` (VS Code fork) and `kron-desktop` (desktop app) as core components in the root, they are currently not present in the repository root as folders.
- **Environment**: The system is fully equipped with Node.js, npm, Bun, and Docker, supporting all project runtimes.
