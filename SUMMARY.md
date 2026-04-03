# KRONOS-OS Project Overview

## Repository Structure
The repository is a monorepo containing several independent products and components:

### 1. **Kronos Agent (formerly Kronbot/Bytebot)**
Located in `kronbot/packages/`.
- **`bytebot-agent`**: NestJS-based orchestration agent (port 9991).
- **`bytebot-agent-cc`**: Computer control variant of the agent, including `@anthropic-ai/claude-code`.
- **`bytebot-ui`**: Next.js-based management UI (port 9992).
- **`bytebotd`**: Core daemon for agent services (port 9990).
- **`shared`**: Common utilities and types used across all Kronos Agent packages.
- **`bytebot-llm-proxy`**: A LiteLLM-based proxy for LLM requests.

### 2. **BrowserOS**
Located in `kronbot/kronosOS/`.
- **`browseros-agent`**: Bun-based monorepo containing:
  - **`apps/server`**: Bun-based MCP server (port 9100).
  - **`apps/agent`**: WXT/React-based Chrome extension for browser automation.
  - **`packages/agent-sdk`**: SDK for building browser agents.
- **`browseros`**: Source code and build resources for a customized Chromium fork.

### 3. **Kronos Browser**
Mentioned as a Zen Browser fork (Firefox-based), but its source code (`kronos-browser`) is not present in the current root directory.

### 4. **Missing Components**
The following components are mentioned in the README and scripts but are currently missing from the repository:
- **`void`**: A VS Code fork with AI features.
- **`kron-desktop`**: A desktop application with React frontend and Express/NestJS backend.

## Initialization Status
The following components have been successfully initialized:
- **`kronbot/packages/shared`**: Built and verified (`dist/` exists).
- **`kronbot/packages/bytebot-agent`**: Dependencies installed and Prisma client generated.
- **`kronbot/packages/bytebot-agent-cc`**: Dependencies installed and Prisma client generated.
- **`kronbot/packages/bytebot-ui`**: Dependencies installed.
- **`kronbot/packages/bytebotd`**: Dependencies installed.
- **`kronbot/kronosOS/packages/browseros-agent`**: Dependencies installed and `agent-sdk` built.

## Technology Stack
- **Runtimes**: Node.js (v22.22.1), Bun (v1.2.14), Docker.
- **Languages**: TypeScript, JavaScript.
- **Frameworks**: NestJS, Next.js, React, Express.
- **Database**: Prisma (v6.16.1).
- **Other**: Chromium (BrowserOS), Tailwind CSS 4, WXT.

## Network Ports
- **bytebotd**: 9990
- **bytebot-agent**: 9991
- **bytebot-ui**: 9992
- **BrowserOS Server**: 9100
- **BrowserOS CDP**: 9000
- **BrowserOS Extension**: 9300
