# 🚀 KRONOS-OS

<div align="center">

![Kronos-OS Banner](assets/mainkronos-logo.png)

**A next-generation intelligent browser ecosystem powered by AI**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)

*A multi-project monorepo containing KRONOS-agent, Void (VS Code fork), kron-desktop, and kronbot*

</div>

---

## ✨ Features

### 🖥️ KRONOS-agent
- **Bun-based MCP server** for intelligent browser automation
- **Chrome extension bridge** for seamless browser control
- **Gemini AI integration** for natural language browsing
- **CDP-based tools** for deep browser interaction
- **Multi-provider LLM support** (Anthropic, OpenAI, Ollama, Groq)

### 🎨 Void (VS Code Fork)
- **AI-powered code editor** with intelligent completions
- **Built-in chat integration** for AI-assisted coding
- **Multi-window support** for advanced workflows
- **Strict module layering** for maintainability
- **Custom extensions** for enhanced productivity

### 💻 kron-desktop
- **Modern desktop application** with React + NextUI
- **Express/NestJS backend** for robust APIs
- **Real-time communication** via WebSocket
- **Responsive design** across all platforms

### 🤖 kronbot
- **Agent orchestration platform** for AI workflows
- **Web-based management UI** (Next.js)
- **Scalable architecture** for multi-agent systems
- **Extensible plugin system**

---

## 🏗️ Architecture

```
kronos-os/
├── BrowserOS-agent/     # Bun MCP server + Chrome extension
├── void/                # VS Code fork with AI features
├── kron-desktop/        # Desktop app (React + Express)
├── kronbot/             # Agent orchestration platform
└── assets/              # Logos and UI assets
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Runtime** | Bun, Node.js, Electron |
| **Language** | TypeScript, Rust (CLI) |
| **Frontend** | React, NextUI, Monaco Editor |
| **Backend** | Express, NestJS, Hono |
| **AI/ML** | Google Gemini, OpenAI, Anthropic |
| **Database** | SQLite (libSQL), In-memory |
| **Build** | Vite, Gulp, Webpack |

---

## 🚀 Quick Start

### Prerequisites

- **Bun** ≥ 1.0 (for BrowserOS-agent)
- **Node.js** ≥ 18 (for void, kron-desktop, kronbot)
- **pnpm** or **npm**

### Installation

```bash
# Clone the repository
git clone https://github.com/Ahmedalsadi-1/kronos-os.git
cd kronos-os

# Install dependencies for each project
cd BrowserOS-agent && bun install
cd ../void && npm install
cd ../kron-desktop/frontend && pnpm install
cd ../../kronbot && npm install
```

### Running the Projects

```bash
# BrowserOS-agent (MCP Server)
cd BrowserOS-agent && bun run start:server

# Void (VS Code Fork)
cd void && npm run compile && npm run watch-client

# kron-desktop Frontend
cd kron-desktop/frontend && pnpm run dev

# kron-desktop Backend
cd kron-desktop/backend && npm run start:dev

# kronbot UI
cd kronbot/packages/bytebot-ui && npm run dev
```

---

## 📁 Project Structure

```
kronos-os/
├── BrowserOS-agent/
│   ├── apps/
│   │   ├── server/           # MCP server (port 9100)
│   │   ├── agent/            # Chrome extension (wxt)
│   │   └── controller-ext/   # Controller extension
│   └── packages/
│       └── agent-sdk/        # SDK for agent development
│
├── void/
│   ├── src/vs/
│   │   ├── base/             # Common utilities
│   │   ├── editor/           # Monaco editor
│   │   ├── workbench/        # Main UI
│   │   │   ├── contrib/      # Extensions (void/, chat/)
│   │   │   ├── api/          # Extension API
│   │   │   └── services/     # Workbench services
│   │   └── platform/         # Platform abstractions
│   └── extensions/           # VS Code extensions
│
├── kron-desktop/
│   ├── frontend/             # React + NextUI
│   └── backend/              # Express/NestJS API
│
├── kronbot/
│   └── packages/
│       ├── bytebot-ui/       # Next.js agent UI
│       └── shared/           # Shared utilities
│
└── assets/                   # UI assets and logos
```

---

## 🔧 Configuration

### BrowserOS-agent Ports

| Port | Env Variable | Purpose |
|------|--------------|---------|
| 9100 | `BROWSEROS_SERVER_PORT` | HTTP server (MCP, chat, health) |
| 9000 | `BROWSEROS_CDP_PORT` | Chromium CDP connection |
| 9300 | `BROWSEROS_EXTENSION_PORT` | WebSocket for extension |

### Void Layering

```
common → browser → electron-sandbox → node → electron-utility → electron-main
```

---

## 📚 Documentation

- [AGENTS.md](AGENTS.md) - Developer knowledge base
- [BrowserOS-agent/AGENTS.md](BrowserOS-agent/AGENTS.md) - Browser automation guide
- [void/src/vs/AGENTS.md](void/src/vs/AGENTS.md) - VS Code fork conventions

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [VS Code](https://code.visualstudio.com/) - The code editor that powers Void
- [Bun](https://bun.sh/) - Fast JavaScript runtime
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - Powerful code editor
- [Google Gemini](https://gemini.google.com/) - AI capabilities
- [NextUI](https://nextui.org/) - Beautiful React UI library

---

<div align="center">

**Built with ❤️ by Ahmed Alsadi**

[🌐 Website](https://kronos-os.dev) • [🐙 GitHub](https://github.com/Ahmedalsadi-1/kronos-os) • [📧 Contact](mailto:albsheralsadi@example.com)

</div>
