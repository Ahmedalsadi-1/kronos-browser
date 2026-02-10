# KRONOS-OS Codebase Overview

This document provides a comprehensive report on the structure, state, and initialization of the KRONOS-OS monorepo as of February 2026.

## 🏗️ Repository Architecture

KRONOS-OS is designed as a unified ecosystem for intelligent browsing, terminal automation, and VM orchestration. The monorepo is intended to house several distinct but integrated products.

### Core Components

1.  **Kronbot (Bytebot)**:
    *   **Location**: `kronbot/`
    *   **Description**: An open-source AI agent orchestration platform. It provides a full virtual desktop environment (Ubuntu + XFCE) that AI agents can control.
    *   **Tech Stack**: NestJS (backend), Next.js (frontend), Prisma (ORM), Docker (orchestration).
    *   **Status**: Fully functional and the most complete project in the repo.

2.  **BrowserOS Agent**:
    *   **Location**: `kronbot/kronosOS/packages/browseros-agent/`
    *   **Description**: A Bun-based MCP (Model Context Protocol) server and Chrome extension bridge. It allows AI models to interact with browsers via CDP.
    *   **Status**: Source code is present and initialized.

3.  **Chromium Fork (BrowserOS)**:
    *   **Location**: `kronbot/kronosOS/packages/browseros/`
    *   **Description**: Build scripts and patches for a custom Chromium engine optimized for AI automation.

### Placeholder & Missing Components

The following directories in the root are currently empty placeholders or have missing source code as per the `README.md` documentation:
*   `void/`: Intended for the VS Code fork (Kronos Editor).
*   `desktop/`: Intended for the native Kronos Desktop application.
*   `EdgyArc-fr/`: Intended for Arc-like browser features.
*   `BrowserOS/`: (Root placeholder, actual source is nested in `kronbot/`).

## 🚀 Initialization & Verification

The following initialization steps were performed to verify the codebase state:

1.  **Shared Utilities**: Built `@bytebot/shared` successfully.
2.  **Bytebot Services**: Installed dependencies and generated Prisma client for `@bytebot/agent`. Installed dependencies for `@bytebot/ui`, `@bytebot/d`, and `@bytebot/agent-cc`.
3.  **BrowserOS Agent**: Installed dependencies using Bun and verified the server component with unit tests (`tests/common/page-collector.test.ts`).

## ⚠️ Known Discrepancies

*   **Documentation vs. Filesystem**: `README.md` and `GEMINI.md` describe `void/` and `kron-desktop/` as "Ready" or "Build Failed", but the source code for these is not present in the current branch's root directory.
*   **Rebranding**: The codebase is in the middle of a rebranding phase (Bytebot -> Kronbot, Factifai -> Kronos Desktop). References to both old and new names exist throughout the docs and code.
*   **Built Extensions**: The `kronos-os/built-extensions/` directory is mentioned in `GEMINI.md` as containing pre-built Safari/Chrome extensions, but it is currently empty.

## 🛠 Tech Stack Summary

| Component | Technology |
| :--- | :--- |
| **Runtime** | Node.js, Bun |
| **Backend** | NestJS, Express |
| **Frontend** | Next.js, React, Tailwind CSS 4 |
| **Automation** | Playwright, CDP, MCP |
| **Infrastructure** | Docker, Prisma, SQLite/Postgres |
