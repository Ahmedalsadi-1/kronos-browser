# KRONOS-OS Project Overview

This repository is a comprehensive monorepo for the KRONOS intelligent browser ecosystem, consisting of multiple AI-driven projects, including agents, a customized browser engine, and desktop automation tools.

## 📂 Project Architecture

The codebase is organized into several key directories:

### 1. `kronbot/` (Kronos Agent Orchestration)
The primary platform for managing AI agents and desktop automation.
- **`packages/shared/`**: Common utilities and types used across all kronbot services.
- **`packages/bytebot-agent/`**: The core NestJS-based orchestration agent.
- **`packages/bytebot-agent-cc/`**: A specialized agent focused on computer control features.
- **`packages/bytebot-ui/`**: A Next.js-based management dashboard for agent tasks and desktop monitoring.
- **`packages/bytebotd/`**: The desktop agent responsible for direct interaction with the virtual environment.
- **`kronosOS/packages/browseros-agent/`**: A Bun-based browser automation agent (MCP server) for controlling Chromium.

### 2. `kronos-os/` (Extensions)
- **`built-extensions/`**: Pre-built browser extension artifacts for both the "BrowserOS Controller" and the "Assistant" UI.

### 3. Placeholder Directories
Several directories in the root serve as empty placeholders or planned project locations:
- **`BrowserOS/`**, **`EdgyArc-fr/`**, **`desktop/`**, **`website/`**: These are currently empty directories without source code or submodules.
- **`void/`**, **`kron-desktop/`**: These projects are mentioned in the root `README.md` as core components but are currently missing from the repository root.

## 🛠 Technology Stack

- **Runtime**: Bun (for BrowserOS agent), Node.js (v22.22.1).
- **Backend**: NestJS, Express, Prisma (v6.16.1), PostgreSQL (via Docker).
- **Frontend**: Next.js, React, Tailwind CSS 4.
- **Browser**: Chromium (forked via BrowserOS), Zen Browser (forked via Kronos-browser).

## 🚀 Initialization Status (March 2026)

The following components have been successfully initialized and built:
- ✅ **Shared Package**: `kronbot/packages/shared`
- ✅ **Agent UI**: `kronbot/packages/bytebot-ui` (Port 9992)
- ✅ **Core Agents**: `kronbot/packages/bytebot-agent` & `kronbot/packages/bytebot-agent-cc` (Port 9991)
- ✅ **Desktop Agent**: `kronbot/packages/bytebotd` (Port 9990)
- ✅ **Browser Agent**: `kronbot/kronosOS/packages/browseros-agent` (initialized via Bun)

## 🔧 Connectivity

Ecosystem services are designed to interconnect using the following default ports:
- **Virtual Desktop (VNC)**: 9990
- **Agent Orchestration**: 9991
- **Management UI**: 9992
- **Browser CDP**: 9000
- **Browser Server**: 9100
- **Browser Extension**: 9300
