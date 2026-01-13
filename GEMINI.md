# Kronos OS Workspace Context

This workspace, `kronos-os`, is a collection of distinct AI-driven browser, agent, and desktop automation projects. Each subdirectory represents a standalone project with its own ecosystem, conventions, and build requirements.

**Last Updated:** Jan 12, 2026

## 📂 Project Structure & Status

| Directory | Project Name | Status | Rebranded? | Themed? | Tech Stack |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`BrowserOS-agent/`** | **BrowserOS Agent** | 🟢 **Ready** | 🟡 Internal | ✅ Indigo | **Bun**, TypeScript |
| **`kron-desktop/`** | **Kronos Desktop** | 🟢 **Ready** | 🟢 Yes | ✅ Indigo | **React**, Vite, Node.js |
| **`kronbot/`** | **Kronos Agent** | 🟢 **Ready** | 🟢 Yes | ✅ Indigo | **Docker**, Node.js, Ubuntu |
| **`void/`** | **Kronos Editor** | 🔴 **Build Failed** | 🟢 Partial | ❌ | **TypeScript**, Electron |
| **`browser/`** | **Kronos Browser** | 🟢 **Built** | 🟢 Yes | ✅ Indigo | **Swift**, SwiftUI |

---

## 🎨 Theme Information
**Kronos OS** uses a unified "Cosmic Indigo" theme:
*   **Primary Color**: `#4F46E5` (Indigo-600) / `oklch(0.48 0.24 275)`
*   **Background (Dark)**: `#09090B` (Zinc-950) / `oklch(0.1 0.002 265)`
*   **Surface (Card)**: `#18181B` (Zinc-900) / `oklch(0.15 0.002 265)`

---

## 🧩 Loading Browser Extensions (Kronos Browser / Safari)

The **BrowserOS Agent** extensions have been updated with the new theme.

### 1. Install "BrowserOS Controller"
1.  Navigate to `kronos-os/built-extensions` in Finder.
2.  Double-click **BrowserOS Controller.app**.
3.  Click "Quit and Open Safari Settings..." (or similar).
4.  Enable the extension.

### 2. Install "Assistant" (Agent UI)
1.  Navigate to `kronos-os/built-extensions` in Finder.
2.  Double-click **Assistant.app**.
3.  Enable the extension.

---

## 🚀 Quick Start (Services)

To launch the ecosystem servers (Kronos Desktop, Kronos Agent, BrowserOS Server):

```bash
./launch_kronos.sh
```

---

## 🛠 Project Details

### 1. BrowserOS-agent
*   **Port**: 9100
*   **Command**: `bun run start:server`
*   **Extensions**: See "Loading Browser Extensions" above.

### 2. Kronos Desktop (formerly Factifai)
*   **Frontend**: http://localhost:5173
*   **Backend**: http://localhost:3001
*   **Notes**: AI-powered computer control for automated testing.

### 3. Kronos Agent (formerly Kronbot/Bytebot)
*   **UI**: http://localhost:9992
*   **Command**: `docker-compose up`
*   **Notes**: Autonomous desktop agent in a virtualized environment.

### 4. Kronos Browser (formerly Ora)
*   **Status**: Built.
*   **Location**: `/Users/albsheralsadi/Library/Developer/Xcode/DerivedData/Kronos-.../Build/Products/Release/Kronos.app`
*   **To Run**: `open /Users/albsheralsadi/Library/Developer/Xcode/DerivedData/Kronos-duxbbmurktzxrgfhpxkykejjkaxb/Build/Products/Release/Kronos.app`
*   **Features**: Now includes an embedded Kronos Assistant panel in the sidebar, accessible via the Kronos Logo button.

---

## ⚠️ Critical Development Rules

1.  **Context Switching**: Always verify which directory you are in before running commands.
2.  **Tool Selection**:
    *   Use **Bun** strictly for `BrowserOS-agent`.
    *   Use **npm/pnpm** for `void`, `kron-desktop`, and `kronbot`.
    *   Use **Xcode/Swift** tools for `browser`.