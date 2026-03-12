# Kronos OS Codebase Report - March 2026

## 1. Overview
This monorepo represents the **Kronos OS** ecosystem, an integrated AI-driven browser and automation platform. It has undergone a major rebranding from its original names (Bytebot, Factifai).

## 2. Project Components

### 🟢 Active & Initialized
- **Kronbot (formerly Bytebot)**: Located in `kronbot/`. A multi-agent orchestration platform.
  - `packages/shared`: Core utilities and types. (Initialized & Built)
  - `packages/bytebot-agent`: NestJS backend agent with Prisma. (Initialized & Prisma Generated)
  - `packages/bytebot-agent-cc`: Claude-Code enabled variant of the agent. (Initialized & Prisma Generated)
  - `packages/bytebot-ui`: Next.js management dashboard. (Initialized)
  - `packages/bytebotd`: Background daemon service. (Initialized)
- **BrowserOS Agent**: Located in `kronbot/kronosOS/packages/browseros-agent`.
  - MCP server, Chrome extension bridge, and SDK. (Initialized with Bun)
  - Verified with `page-collector` tests.
- **BrowserOS Chromium Fork**: Source and patches located in `kronbot/kronosOS/packages/browseros`.
- **Website**: Landing page at `website/index.html`.

### 🟡 Pre-built Artifacts
- **BrowserOS Extension**: Pre-compiled extension artifacts in `kronbot/BrowserOS-agent`.
- **Built Extensions**: MacOS/Safari extension installers in `kronos-os/built-extensions`.

### 🔴 Missing or Placeholder Components
- **Void (Kronos Editor)**: Mentioned in `README.md` as a VS Code fork, but the directory is missing from the root.
- **Kronos Desktop (formerly Factifai)**: Mentioned in `README.md` and `launch_kronos.sh`, but the `kron-desktop/` directory is missing from the root.
- **EdgyArc-fr**: Root directory exists but is empty.
- **BrowserOS (Root level)**: Root directory exists but is empty.
- **desktop (Root level)**: Root directory exists but is empty.

## 3. Tech Stack
- **Languages**: TypeScript, JavaScript.
- **Runtimes**: Node.js (v22), Bun (v1.2).
- **Frameworks**: NestJS, Next.js, React.
- **Database**: Prisma with SQLite/PostgreSQL support.
- **Automation**: CDP (Chrome DevTools Protocol), MCP (Model Context Protocol).

## 4. Initialization Status
- All active Node.js packages in `kronbot/` have had `npm install` executed.
- Prisma clients have been generated for all database-backed services.
- Shared libraries have been built and are ready for consumption.
- BrowserOS Agent has been initialized with Bun and its SDK has been built.

## 5. Known Issues
- `launch_kronos.sh` fails to start frontend/backend for "Kronos Desktop" as the paths are missing.
- Tests in `browseros-agent` have hardcoded macOS paths, causing failures in this Linux environment.
- Missing `eslint.config.js` in `packages/shared` prevents linting.
