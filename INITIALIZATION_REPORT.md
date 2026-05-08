### Project Components Status
| Component | Status | Tech Stack | Notes |
| --- | --- | --- | --- |
| @bytebot/shared | 🟢 Initialized | TypeScript | Build successful |
| bytebot-agent | 🟢 Initialized | NestJS, Prisma | Prisma client generated |
| bytebot-ui | 🟢 Initialized | Next.js | Dependencies installed |
| browseros-agent | 🟢 Initialized | Bun | Dependencies installed |

### Discrepancies Found
- Root directories `BrowserOS/`, `EdgyArc-fr/`, and `desktop/` are empty placeholders. The actual code is located within `kronbot/`.
- Documentation refers to `void/` which is missing from the root (it might be in a different branch or submodule not fully initialized).
- `BrowserOS-agent` tests have hardcoded macOS paths (`/Applications/BrowserOS.app`), causing integration test failures in this Linux environment.

### Environment Info
- Node: v22.22.1
- NPM: 11.11.0
- Bun: 1.2.14
- Docker: Docker version 29.2.1, build a5c7197
