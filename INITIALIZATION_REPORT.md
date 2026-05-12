# Kronos/Bytebot Ecosystem Initialization Report - April 2026

## 🏗 Architecture Overview

The codebase is organized into a multi-layered ecosystem for AI-driven desktop and browser automation.

### 1. Orchestration Layer (`kronbot/`)
- **`bytebot-agent` & `bytebot-agent-cc`**: NestJS services that act as the brain. They handle task management, persistence (via Prisma), and orchestration of AI interactions.
- **`bytebotd`**: A system-level daemon (NestJS) for direct computer control (mouse/keyboard via `nut-js`).
- **`bytebot-ui`**: A modern Next.js management dashboard (Port 9992) for monitoring agents and tasks.
- **`shared`**: A TypeScript package containing shared types and utilities used by all NestJS/Next.js services.

### 2. Browser Engine & Automation (`kronbot/kronosOS/`)
- **`browseros`**: A custom Chromium fork designed for native AI agent integration.
- **`browseros-agent`**: A Bun-powered monorepo:
    - **`server`**: An MCP-compliant server (Port 9100) that exposes browser automation tools.
    - **`agent-sdk`**: A high-level SDK for programmatic interaction with the browser.
    - **`agent`**: The Chrome extension bridge.

### 3. Static & Pre-built Assets
- **`website/`**: Static landing page.
- **`kronos-os/built-extensions/`**: Pre-compiled extension binaries for Safari and Chrome.

---

## 🛠 Tech Stack

- **Runtimes**: Node.js v22.22.1, Bun v1.2.14, Docker v29.2.1.
- **Frameworks**: NestJS (Orchestration), Next.js 15 (UI), Hono (Browser Server).
- **Languages**: TypeScript (Strict mode), JavaScript, CSS (Tailwind CSS 4).
- **Database**: Prisma v6.16.1 (using SQLite by default).
- **AI Integration**: Anthropic Claude, OpenAI, Google Gemini (via LiteLLM proxy).

---

## 🚦 Initialization Status

| Component | Status | Verification |
| :--- | :--- | :--- |
| **@bytebot/shared** | 🟢 Ready | Build successful (`dist/` exists) |
| **bytebot-agent** | 🟢 Ready | Initialized, Prisma generated, Build successful |
| **bytebot-agent-cc**| 🟢 Ready | Initialized, Prisma generated, Build successful |
| **bytebotd** | 🟢 Ready | Initialized, Build successful |
| **bytebot-ui** | 🟢 Ready | Initialized, Build successful (ESLint fix applied) |
| **browseros-agent** | 🟡 Partial | `bun install` complete, SDK built. Server build requires secrets. |
| **void** | 🔴 Missing | Source code not found in root (placeholder only). |
| **kron-desktop** | 🔴 Missing | Source code not found in root (placeholder only). |

---

## 🔗 Port Mapping & Connectivity

- **9992**: Bytebot Management UI
- **9991**: Bytebot Orchestration Agent (API)
- **9990**: Bytebot Daemon (Desktop Control/VNC)
- **9100**: BrowserOS MCP Server
- **9000**: BrowserOS CDP (Remote Debugging)

---

## 📝 Critical Notes & Discrepancies

1. **Missing Source**: While `README.md` mentions `void` (VS Code fork) and `kron-desktop`, these directories are currently empty placeholders in the repository root.
2. **ESLint Fix**: `bytebot-ui` had a build-blocking ESLint error in `Header.tsx` (unused `useTheme`) which has been patched.
3. **Environment**: `.env` files have been initialized from `.env.example` templates across the `kronbot/packages` directory.
4. **BrowserOS Filter**: The root `package.json` for `browseros-agent` uses legacy filter names (`@browseros/server`); these were manually bypassed using `@kronos/server`.
