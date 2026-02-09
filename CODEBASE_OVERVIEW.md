# KRONOS-OS Codebase Overview

Welcome to the **KRONOS-OS** monorepo. This document provides a comprehensive map of the project's architecture, components, and current state as of February 2026.

## 🚀 Vision
KRONOS-OS is an ecosystem designed to merge AI agents with web browsing and desktop automation. It aims to provide a privacy-first, open-source alternative to proprietary AI browsing tools.

## 🏗️ Monorepo Structure

The repository is organized as a nested monorepo. While several root-level directories exist, most active development is concentrated within the `kronbot/` directory.

### 📁 Root Directories
- **`kronbot/`**: The primary active project. Contains the agent orchestration platform and the BrowserOS agent.
- **`kronos-os/`**: Contains pre-built browser extensions in `built-extensions/`.
- **`website/`**: A placeholder for the project's landing page.
- **`BrowserOS/`, `EdgyArc-fr/`, `desktop/`**: Currently empty placeholder directories.

### 🤖 Kronbot (AI Desktop Agent)
Located in `kronbot/`, this project uses a NestJS/Next.js stack.
- **`packages/shared/`**: Common utilities and types used across the ecosystem.
- **`packages/bytebot-ui/`**: Next.js-based web interface for managing agents and tasks (Default Port: 9992).
- **`packages/bytebot-agent/`**: NestJS service that coordinates AI actions (Default Port: 9991).
- **`packages/bytebot-agent-cc/`**: "Computer Control" agent for low-level desktop interaction.
- **`packages/bytebotd/`**: Daemon service for background task management (Default Port: 9990).
- **`packages/bytebot-llm-proxy/`**: LiteLLM-based proxy for multi-provider support.

### 🌐 BrowserOS Agent
Located in `kronbot/kronosOS/packages/browseros-agent/`, this is a Bun-powered monorepo for browser automation.
- **`apps/server/`**: An MCP (Model Context Protocol) server for controlling the browser (Default Port: 9100).
- **`apps/agent/`**: A Chrome extension that bridges browser APIs to the MCP server.
- **`packages/agent-sdk/`**: SDK for building browser-based agents.

## 🛠️ Tech Stack
- **Languages**: TypeScript (Primary), JavaScript.
- **Runtimes**: Node.js (v20+), Bun (v1.0+).
- **Backend**: NestJS, Express.
- **Frontend**: Next.js, React, Tailwind CSS, NextUI.
- **Database**: Prisma with SQLite.
- **Orchestration**: Docker Compose, Helm.

## ⚠️ Known Discrepancies & Issues
1. **Outdated Documentation**: The main `README.md` refers to projects like `void` and `kron-desktop` in the root, which are currently missing or represented by empty folders.
2. **Launch Script**: `launch_kronos.sh` in the root refers to non-existent paths (e.g., `kron-desktop/backend`) and may fail if run directly. Use the individual package start scripts instead.
3. **Submodule Transition**: The project appears to be transitioning towards a consolidated structure inside `kronbot/`, explaining the empty root directories.
4. **Build Order**: Always build `@bytebot/shared` before attempting to build or run other packages in `kronbot/packages/`.

## 🚦 Getting Started
1. **Initialize Shared**: `cd kronbot/packages/shared && npm install && npm run build`
2. **Initialize Agent**: `cd kronbot/packages/bytebot-agent && npm install && npx prisma generate`
3. **Initialize BrowserOS**: `cd kronbot/kronosOS/packages/browseros-agent && bun install`
