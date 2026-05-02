# Kronos OS Codebase Summary

## 🏗️ Architecture Overview
Kronos OS is a multi-project monorepo designed for AI-driven browser automation and agent orchestration. The ecosystem is primarily centered around the `kronbot/` directory, which contains the orchestration logic, UI, and custom browser integration.

### Core Components
| Component | Location | Description | Tech Stack |
| :--- | :--- | :--- | :--- |
| **Bytebot Agent** | `kronbot/packages/bytebot-agent` | The main orchestration agent responsible for task execution and LLM integration. | NestJS, Prisma |
| **Bytebot Agent CC** | `kronbot/packages/bytebot-agent-cc` | A secondary agent variant, likely for specific command-and-control tasks. | NestJS, Prisma |
| **Bytebot UI** | `kronbot/packages/bytebot-ui` | Next.js management dashboard for interacting with agents and monitoring tasks. | Next.js, Tailwind CSS 4, NextUI |
| **Bytebot Daemon** | `kronbot/packages/bytebotd` | Background service for handling system-level tasks like input tracking and computer use. | NestJS |
| **BrowserOS Agent** | `kronbot/kronosOS/packages/browseros-agent` | Provides browser automation tools via MCP (Model Context Protocol). | Bun, TypeScript |
| **BrowserOS** | `kronbot/kronosOS/packages/browseros` | Custom Chromium/Ungoogled-Chromium fork with built-in agent capabilities. | C++, Python (Build) |
| **Shared** | `kronbot/packages/shared` | Common utilities and constants used across the `bytebot-*` ecosystem. | TypeScript |

## 🛠 Tech Stack
*   **Backend:** NestJS, Express, Bun (for BrowserOS Agent)
*   **Frontend:** Next.js (App Router), React, Tailwind CSS 4, NextUI
*   **Database:** Prisma ORM with SQLite/PostgreSQL support
*   **Automation:** MCP (Model Context Protocol), CDP (Chrome DevTools Protocol)
*   **Infrastructure:** Docker, Docker Compose

## 🚀 Initialization & Build
The project requires a specific initialization sequence:
1.  **Shared Package:** Build `kronbot/packages/shared` first.
2.  **Prisma Clients:** Generate Prisma clients for `bytebot-agent` and `bytebot-agent-cc`.
3.  **Environment:** Set up `.env` files from `.env.example` templates.
4.  **Dependencies:** `npm install` for Node projects, `bun install` for BrowserOS Agent.

## 🎨 Theme
The ecosystem follows a **"Cosmic Indigo"** theme:
*   **Primary:** `#4F46E5` (Indigo-600)
*   **Background:** `#09090B` (Zinc-950)
*   **Surface:** `#18181B` (Zinc-900)

## 📁 Repository Structure Highlights
*   `kronbot/`: Active development directory for agent orchestration.
*   `kronbot/kronosOS/`: Browser-specific source code and agent.
*   `assets/`: Logos and UI design concepts.
*   `built-extensions/`: Pre-built browser extensions for Safari/Chrome.
