# VOID (VS CODE FORK) PROJECT KNOWLEDGE BASE

**Generated:** 2026-01-12
**Commit:** local-dev
**Branch:** local

## OVERVIEW
VS Code fork with AI features and chat integration. ESM-based with strict layering and multi-window support.

## STRUCTURE
```
void/src/vs/
├── base/              # Low-level utilities, platform APIs
├── editor/            # Monaco editor core
├── platform/           # Platform abstractions (vscode-*)
├── workbench/          # Main UI, workbench logic
│   ├── contrib/        # Extensions and features
│   │   ├── void/     # Custom AI/editor features
│   │   └── chat/     # AI chat integration
│   ├── api/           # Extension API layer
│   └── services/       # Workbench services
├── code/              # Main entry points
├── server/            # Server-side code (for web/remote)
└── cli/               # Rust CLI (build.rs in cli/src/)
```

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| AI features | void/src/vs/workbench/contrib/void/ | Custom editor features |
| Chat integration | void/src/vs/workbench/contrib/chat/ | AI chat panels, streaming |
| Extension API | void/src/vs/workbench/api/ | API contracts, implementations |
| Workbench UI | void/src/vs/workbench/browser/ | Main UI components |
| Monaco editor | void/src/vs/editor/ | Text editing, languages |
| Platform services | void/src/vs/platform/ | File system, dialogs, config |

## CONVENTIONS

### Layering (STRICT)
Enforced by ESLint `local/code-layering` rule:
```
common → browser → electron-sandbox → node → electron-utility → electron-main
```
- Import flow follows direction only
- `/~` pattern expands to all layer variants
- Violations: compile-time error

### Multi-Window Support
**ALWAYS** use `DOM.getWindow(element)` or `DOM.getActiveWindow()` before DOM access:
```typescript
// ✅ Correct
const targetWindow = DOM.getWindow(element);
const doc = targetWindow.document;
doc.getElementById('foo');

// ❌ Wrong
document.getElementById('foo');
```

### Forbidden Globals in ESM
- `__dirname`, `__filename` → Use `fileURLToPath(import.meta.url)`
- `require()` → Use ES `import`
- Global `window`, `document` → Use `DOM.getWindow()`, `DOM.getActiveWindow()`

### Event Listeners
**NEVER** use global `window.addEventListener()`:
```typescript
// ✅ Correct
targetWindow.addEventListener('click', handler);

// ❌ Wrong
window.addEventListener('click', handler);
```

### Terminal Variables
- Private: `_varName` (leading underscore)
- Protected: `varName` (no prefix)
- Public: `camelCase` or `UPPER_CASE`

### Naming Conventions
- Classes: `PascalCase` (`class MyService { }`)
- Interfaces: `PascalCase` (`interface IThing { }`)
- Variables: `camelCase` (or `UPPER_CASE` for constants)
- Functions: `camelCase` (`function doSomething() { }`)

## ANTI-PATTERNS (THIS PROJECT)

### NEVER
- Access `document`, `window` directly in browser/electron-sandbox layers
- Use `window.addEventListener`, `window.removeEventListener` globally
- Import node modules in browser layer
- Import electron APIs in browser layer (except electron-utility)
- Use `require()`, `__dirname`, `__filename` in ESM files
- Import from higher layers (violates layering)

### ALWAYS
- Use `DOM.getWindow(element)` to resolve window context
- Follow layering: common → browser → electron-sandbox → node → electron-utility → electron-main
- Use ESM `import` not CJS `require()`

### RESTRICTED GLOBALS
`name`, `length`, `event`, `closed`, `external`, `status`, `origin`, `orientation`, `context`

### BUILD SYSTEM
- **Gulp + Webpack** (not Vite, not turbopack)
- Custom preinstall script runs before npm install
- `npm run compile` → Gulp builds
- `npm run watch` → Live rebuild with deemon

## COMMANDS
```bash
cd void

# Build
npm run compile                 # Full Gulp compile
npm run watch-client            # Watch and rebuild client
npm run watch-extensions        # Watch and rebuild extensions

# Quality
npm run eslint                 # Run ESLint
npm run smoketest              # Run smoke tests
npm run test-browser           # Playwright browser tests
npm run test-node             # Mocha node tests

# Type checks
npm run monaco-compile-check  # Verify Monaco compilation
npm run tsec-compile-check     # Security type check
npm run vscode-dts-compile-check  # API type definitions
```

## NOTES

### Entry Points
- Desktop: `src/vs/code/electron-main/main.js`
- Web: `src/vs/code/workbench/workbench.web.main.ts`
- API: `src/vs/workbench/api/`

### Custom Extensions
- **void/**: Custom AI/editor features (Microsoft header removed)
- **chat/**: AI chat integration with streaming

### Multi-Window Architecture
VS Code now supports multiple editor windows. All DOM/window access must go through context-aware APIs to target the correct window.

### Import Restrictions
Enforced by `local/code-import-patterns` rule - only specific imports allowed per layer to maintain architecture.
