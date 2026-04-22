# Kronos-OS Ecosystem Summary

## Project Overview
Kronos-OS is a next-generation intelligent browser ecosystem. It aims to integrate AI orchestration with a custom browser (Kronos Browser), a virtual desktop environment (Kronos Desktop), and advanced browser automation tools (BrowserOS).

## Repository Structure

### 1. Root Directory
- `kronbot/`: The primary monorepo containing the AI agent orchestration services and UI.
- `kronos-os/`: Contains pre-built extensions.
- `assets/`: UI assets, logos, and architecture diagrams.
- `website/`: Source for the project's landing page.
- `BrowserOS/`, `EdgyArc-fr/`, `desktop/`: Currently empty placeholder directories.
- `launch_kronos.sh`: Main entry point for starting the entire ecosystem.

### 2. Kronbot (`kronbot/packages/`)
- `bytebot-agent`: NestJS service for AI orchestration and task management.
- `bytebot-agent-cc`: Computer control agent using nut.js.
- `bytebot-ui`: Next.js web interface for managing tasks and viewing the virtual desktop.
- `bytebotd`: Desktop daemon for computer control and input tracking.
- `shared`: Common TypeScript types and utilities used across all packages.
- `bytebot-llm-proxy`: LiteLLM integration for multi-provider support.

### 3. BrowserOS Agent (`kronbot/kronosOS/packages/browseros-agent/`)
- A Bun-based monorepo.
- `apps/server`: MCP (Model Context Protocol) server for browser automation.
- `apps/agent`: Chrome extension for the agent interface.
- `apps/controller-ext`: Controller extension for deep browser interaction.
- `packages/agent-sdk`: SDK for developing agents that interact with BrowserOS.

### 4. BrowserOS (`kronbot/kronosOS/packages/browseros/`)
- Resources for a custom Chromium fork optimized for AI control.

## Technology Stack
- **Runtimes**: Node.js (v22), Bun (v1.2).
- **Languages**: TypeScript, Rust (for some CLI tools), Python (for BrowserOS config).
- **Frameworks**: NestJS (backend), Next.js (frontend), React, NextUI, Tailwind CSS 4.
- **Database**: Prisma ORM with SQLite/PostgreSQL.
- **Automation**: CDP (Chrome DevTools Protocol), nut.js.
- **AI**: Integration with Google Gemini, Anthropic Claude, and OpenAI via LiteLLM.

## Current Status
- **Initialization**: All core packages (`shared`, `bytebot-agent`, `bytebot-ui`, `bytebotd`, `browseros-agent`) have been initialized with dependencies installed and successful builds.
- **Database**: Prisma clients have been generated for the agent services.
- **Testing**: Basic functionality of the BrowserOS server has been verified through unit tests.
- **Rebranding**: The project is transitioning from the legacy name "Bytebot" to "Kronos".

## Usage
To start the ecosystem:
1. Ensure Docker is running.
2. Run `./launch_kronos.sh` from the root directory.
3. Access the UI at `http://localhost:9992`.
