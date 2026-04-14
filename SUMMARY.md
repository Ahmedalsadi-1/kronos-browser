# KRONOS-OS Project Overview

## Repository Structure

The repository is a multi-project monorepo organized into several core components:

### 1. Kronbot Ecosystem (`/kronbot`)
The primary agent orchestration platform.
- **`packages/shared`**: Common utilities, types, and computer action helpers used across the ecosystem.
- **`packages/bytebot-agent`**: A NestJS-based orchestration agent that manages tasks and coordinates AI interactions. Uses Prisma for persistence.
- **`packages/bytebot-agent-cc`**: A secondary Control Center agent, also built with NestJS and Prisma.
- **`packages/bytebot-ui`**: A Next.js-based management dashboard. It uses a custom Express server to proxy traffic to agents and the virtual desktop.
- **`packages/bytebotd`**: A daemon service for local machine interaction, utilizing `nut-js` and `uiohook-napi`.
- **`packages/bytebot-llm-proxy`**: A LiteLLM-based proxy for multi-provider AI support (Anthropic, OpenAI, Gemini).

### 2. BrowserOS Suite (`/kronbot/kronosOS`)
Intelligent browser automation tools.
- **`packages/browseros-agent`**: A Bun-powered monorepo containing:
  - **`apps/server`**: An MCP (Model Context Protocol) server for browser control.
  - **`apps/agent`**: A Chrome extension providing a chat interface.
  - **`apps/controller-ext`**: A bridge extension for deep browser API access.
- **`packages/browseros`**: Contains configuration, patches, and build scripts for a customized Chromium-based browser.

### 3. Placeholders and Assets
- **`website/`**: The landing page for the project.
- **`assets/`**: High-resolution logos, banners, and UI components.
- **Empty Placeholders**: `BrowserOS/`, `EdgyArc-fr/`, and `desktop/` appear to be reserved for future components or external integrations.

## Technologies Used

| Layer | Technology |
|-------|------------|
| **Runtimes** | Node.js (v22), Bun (v1.2) |
| **Back-end** | NestJS, Hono, Express |
| **Front-end** | Next.js, React, Tailwind CSS 4, NextUI |
| **ORM** | Prisma (v6.16.1) |
| **Automation** | CDP (Chrome DevTools Protocol), WebSocket |
| **AI Integration** | Google Gemini, Anthropic SDK, OpenAI SDK, LiteLLM |

## Initialization Status

All core components have been initialized:
- ✅ **Shared Library**: Built and ready for dependency injection.
- ✅ **Agents**: Dependencies installed and Prisma clients generated for both `bytebot-agent` and `bytebot-agent-cc`.
- ✅ **Management UI**: Next.js environment ready.
- ✅ **BrowserOS Agent**: Bun environment initialized and `agent-sdk` built.
- ✅ **Daemon**: Local machine control dependencies installed.

## Network Mapping (Defaults)

- **9000**: BrowserOS CDP Port
- **9100**: BrowserOS MCP Server
- **9300**: BrowserOS Extension Controller
- **9990**: Bytebot Daemon (Desktop Control)
- **9991**: Bytebot Agent (Orchestration)
- **9992**: Bytebot UI (Dashboard)
