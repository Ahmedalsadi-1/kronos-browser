# VOID CORE - VS CODE SOURCE CODE

**Generated:** 2026-01-14
**Commit:** local-dev
**Branch:** local

## OVERVIEW
Core VS Code source code with strict layering architecture. Contains main workbench, editor, platform, and base utilities. Enforced ESM module boundaries.

## STRUCTURE
```
src/vs/
├── base/              # Low-level utilities, platform APIs
├── editor/            # Monaco editor core
├── platform/           # Platform abstractions (vscode-*)
├── workbench/          # Main UI, workbench logic
├── code/              # Main entry points
├── server/            # Server-side code (for web/remote)
└── cli/               # Rust CLI (build.rs in cli/src/)
```

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| Core utilities | src/vs/base/ | Foundation utilities, logging, async helpers |
| Monaco editor | src/vs/editor/ | Text editing, languages, decorations |
| Platform services | src/vs/platform/ | File system, dialogs, config, telemetry |
| Workbench UI | src/vs/workbench/ | Main UI, extensions, services |
| Entry points | src/vs/code/ | Desktop, web, CLI main files |
| Server components | src/vs/server/ | Web server, remote development |

## CONVENTIONS

### Strict Layering
Enforced by ESLint `local/code-layering` rule:
```
common → browser → electron-sandbox → node → electron-utility → electron-main
```
- Import flow follows direction only
- `/~` pattern expands to all layer variants
- Violations: compile-time error

### ESM Modules
- All TS files are ESM modules
- No `require()`, `__dirname`, `__filename`
- Use `import.meta.url` and `fileURLToPath`

### Multi-Window Support
**ALWAYS** use `DOM.getWindow(element)` or `DOM.getActiveWindow()` before DOM access.

## ANTI-PATTERNS (THIS PROJECT)

### NEVER
- Access `document`, `window` directly in browser/electron-sandbox layers
- Use `window.addEventListener`, `window.removeEventListener` globally
- Import node modules in browser layer
- Import electron APIs in browser layer (except electron-utility)
- Use `require()`, `__dirname`, `__filename` in ESM files
- Import from higher layers (violates layering)

### RESTRICTED GLOBALS
`name`, `length`, `event`, `closed`, `external`, `status`, `origin`, `orientation`, `context`