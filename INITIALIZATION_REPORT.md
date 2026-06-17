# Kronos OS Initialization Report

**Generated:** June 2026
**Environment:** Linux (Ubuntu 24.04)
**Software:** Node v22.22.1, Bun 1.2.14, Docker 29.2.1

## 📂 Repository Map & Status

The actual project source code is primarily located within the `kronbot/` directory, specifically under `packages/` and `kronosOS/packages/`.

| Component | Actual Path | Status |
| :--- | :--- | :--- |
| **@bytebot/shared** | `kronbot/packages/shared` | 🟢 Initialized & Built |
| **bytebot-agent** | `kronbot/packages/bytebot-agent` | 🟢 Initialized (Prisma Generated) |
| **bytebot-agent-cc** | `kronbot/packages/bytebot-agent-cc` | 🟢 Initialized (Prisma Generated) |
| **bytebot-ui** | `kronbot/packages/bytebot-ui` | 🟢 Initialized |
| **browseros-agent** | `kronbot/kronosOS/packages/browseros-agent` | 🟢 Initialized (Bun) |
| **browseros (Chromium)** | `kronbot/kronosOS/packages/browseros` | 🟡 Patches Available |
| **void (Editor)** | N/A | 🔴 Missing from root/subdirs |
| **kron-desktop** | N/A | 🔴 Missing from root/subdirs |

## 🛠 Tech Stack & Initialization

### 1. Core Libraries
- **@bytebot/shared**: Built via `npm run build`. This library is a prerequisite for all bytebot services.
- **@browseros/shared**: Integrated within the `browseros-agent` Bun monorepo.

### 2. NestJS Services (Bytebot Suite)
- **Package Manager**: npm
- **Database**: Prisma with SQLite/libSQL.
- **Initialization**: `npx prisma@6.16.1 generate` was executed for both `bytebot-agent` and `bytebot-agent-cc`.

### 3. Bun Monorepo (BrowserOS Agent)
- **Package Manager**: Bun
- **Initialization**: `bun install` completed successfully.
- **Agent SDK**: Automatically built during installation.

## 🔌 Service Port Map

| Service | Port | Protocol |
| :--- | :--- | :--- |
| **Bytebot UI** | 9992 | HTTP |
| **Bytebot Agent** | 9991 | HTTP/WS |
| **Bytebotd** | 9990 | HTTP |
| **BrowserOS MCP** | 9100 | HTTP/SSE |
| **BrowserOS CDP** | 9000 | CDP |
| **BrowserOS Ext** | 9300 | WebSocket |

## 🧪 Testing Summary

- **Unit Tests**: Verified passing for `@kronos/server` (e.g., `page-collector.test.ts`).
- **Integration Tests**: Currently failing in this environment due to hardcoded macOS binary paths (`/Applications/BrowserOS.app`) in the test setup.
- **Dependencies**: Added `sinon@22.0.0` to `browseros-agent/apps/server` to satisfy test requirements.
- **Missing Tests**: `bytebot-agent` and `bytebot-agent-cc` lack functional `.spec.ts` files.

## ⚠️ Known Issues & Discrepancies

1. **Missing Projects**: `void` and `kron-desktop` are referenced in root documentation but do not exist in the repository structure.
2. **Environment Mismatch**: The `launch_kronos.sh` script is macOS-specific (uses `osascript`) and will not run on Linux.
3. **Hardcoded Paths**: BrowserOS-agent tests expect a macOS environment.
