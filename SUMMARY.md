# KRONOS-OS Project Overview

## 🏗️ Architecture & Component Locations

The repository is structured as a multi-project monorepo. While several directories exist at the root, many are currently placeholders or empty. The active source code is primarily located within the `kronbot/` directory.

### Core Active Components

| Component | Location | Technology | Status |
|-----------|----------|------------|--------|
| **Shared Lib** | `kronbot/packages/shared` | TypeScript, ESLint | 🟢 Initialized & Built |
| **Agent API** | `kronbot/packages/bytebot-agent` | NestJS, Prisma, PostgreSQL | 🟢 Initialized & Built |
| **Agent UI** | `kronbot/packages/bytebot-ui` | Next.js, Tailwind CSS | 🟢 Initialized & Built |
| **BrowserOS Agent** | `kronbot/kronosOS/packages/browseros-agent` | Bun, Hono, MCP | 🟢 Initialized & Tests Passing |

### Empty or Missing Components (from root)
The following directories at the root were found to be empty or missing despite being mentioned in documentation:
- `BrowserOS/` (Empty)
- `EdgyArc-fr/` (Empty)
- `desktop/` (Empty)
- `void/` (Missing)
- `kron-desktop/` (Missing)

## 🚀 Initialization Status

### 1. `kronbot/packages/shared`
- **Action**: `npm install && npm run build`
- **Result**: Successfully produced `dist/` containing types and utilities.

### 2. `kronbot/packages/bytebot-agent`
- **Action**: `npm install && npx prisma generate && npm run build`
- **Result**: Dependencies installed, Prisma client generated, and NestJS build successful.
- **Note**: No unit tests found in `src/`.

### 3. `kronbot/packages/bytebot-ui`
- **Action**: `npm install && npm run build`
- **Result**: Successfully built the Next.js application.
- **Fixes**: Removed unused `useTheme` and `resolvedTheme` in `Header.tsx` to resolve linting errors that blocked the build.

### 4. `kronbot/kronosOS/packages/browseros-agent`
- **Action**: `bun install`
- **Result**: Dependencies installed and `agent-sdk` built via postinstall.
- **Testing**: `bun test tests/common/page-collector.test.ts` passed (5/5 tests).
- **Environment**: Initialized `.env.development` from `.env.example` in `apps/server`.

## 🛠 Tech Stack Details
- **Runtime**: Node.js v22, Bun v1.2.14
- **Language**: TypeScript
- **Backend**: NestJS (Agent), Hono (BrowserOS Server)
- **Frontend**: Next.js 15 (Agent UI)
- **Database**: Prisma with SQLite/PostgreSQL support
- **AI Integration**: Google Gemini, Anthropic, OpenAI
