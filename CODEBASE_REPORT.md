# Kronos OS Codebase Report

## 📅 Report Date: March 2026

## 📝 Overview
The Kronos OS project is a multi-project monorepo aimed at building a next-generation intelligent browser ecosystem. It integrates browser automation, AI agent orchestration, and custom browser interfaces.

---

## 🏗️ Architecture & Component Status

| Component | Path | Status | Technology |
| :--- | :--- | :--- | :--- |
| **Kronbot (Agent Platform)** | `kronbot/` | 🟢 Initialized | Node.js, NestJS, Next.js, Docker |
| **BrowserOS Agent** | `kronbot/kronosOS/packages/browseros-agent/` | 🟢 Initialized | Bun, TypeScript |
| **Built Extensions** | `kronos-os/built-extensions/` | 🟡 Artifacts Only | Safari/Chrome Extensions |
| **Website** | `website/` | 🟡 Placeholder | HTML/CSS |
| **Void (Kronos Editor)** | `void/` | 🔴 Missing | VS Code Fork |
| **Kronos Desktop** | `kron-desktop/` | 🔴 Missing | React, NextUI, Node.js |
| **Kronos Browser** | `kronos-browser/` | 🔴 Missing | Zen/Firefox Fork |
| **BrowserOS (Chromium)** | `BrowserOS/` | ⚪ Empty | Chromium Fork |
| **EdgyArc-fr** | `EdgyArc-fr/` | ⚪ Empty | Arc-like Browser |

---

## 🛠️ Technical Stack & Infrastructure

### 🚀 Initialization Results
- **Shared Library**: `kronbot/packages/shared` built successfully.
- **Database**: Prisma clients generated for `bytebot-agent` and `bytebot-agent-cc`.
- **Dependencies**: All available microservices have `node_modules` installed.
- **Verification**: Baseline tests for `@kronos/server` passed (5/5).

### 🌐 Network Ports
| Service | Port | Default Usage |
| :--- | :--- | :--- |
| **Bytebot Daemon** | 9990 | Backend Orchestration |
| **Bytebot Agent** | 9991 | AI Agent Service |
| **Bytebot UI** | 9992 | Management Web Interface |
| **BrowserOS Server** | 9100 | MCP Server / Extension Bridge |
| **BrowserOS CDP** | 9000 | Chrome DevTools Protocol |
| **BrowserOS Ext** | 9300 | Extension WebSocket |
| **Kronos Desktop FE** | 5173 | Desktop UI (Vite default) |
| **Kronos Desktop BE** | 3001 | Desktop Backend |

---

## 🏷️ Rebranding Status: Bytebot ➡️ Kronbot

| Level | Status | Details |
| :--- | :--- | :--- |
| **High-level Docs** | ✅ Complete | README.md, GEMINI.md, etc., use "Kronos". |
| **Launch Scripts** | ✅ Complete | `launch_kronos.sh` updated to use new naming. |
| **Directory Names** | ❌ Pending | `kronbot/` exists, but subpackages still use `bytebot-*`. |
| **Internal Docs** | ❌ In Progress | `kronbot/docs/` contains many references to "Bytebot". |
| **Code / package.json**| ❌ Pending | package.json names still use `@bytebot/*`. |

---

## ⚠️ Identified Gaps & Missing Components
1. **Missing Source Code**: Several core projects mentioned in the root README (`void`, `kron-desktop`, `kronos-browser`) are missing from the repository root.
2. **Empty Directories**: `BrowserOS`, `EdgyArc-fr`, and `desktop` are present but contain no files.
3. **Hardcoded Paths**: Tests in `browseros-agent` have hardcoded macOS paths, causing failures in Linux environments.
4. **Build Artifacts**: `kronos-os/built-extensions/` contains pre-built apps but not their source projects.

---

## 🚦 Recommendations
- **Consolidate Naming**: Synchronize package names and directory structures to reflect the "Kronos/Kronbot" brand.
- **Verify Submodules**: Ensure that missing projects aren't supposed to be git submodules that haven't been initialized.
- **Cross-Platform Tests**: Generalize the BrowserOS agent tests to support Linux environments.
