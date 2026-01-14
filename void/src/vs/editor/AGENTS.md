# MONACO EDITOR CORE

**Generated:** 2026-01-14
**Commit:** local-dev
**Branch:** local

## OVERVIEW
Monaco editor core - the same engine that powers VS Code. Text editing, languages, decorations, diff views, and editor services.

## STRUCTURE
```
src/vs/editor/
├── common/            # Shared utilities and types
├── browser/           # Browser-specific implementations
├── contrib/           # Additional features (diff, find, etc.)
├── standalone/         # Standalone editor API
└── worker/            # Web workers for heavy computation
```

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| Text model | src/vs/editor/common/model/ | Document model, text buffer |
| Language features | src/vs/editor/common/languages/ | Language services, completions |
| Browser editor | src/vs/editor/browser/ | DOM-based editor widget |
| Standalone API | src/vs/editor/standalone/ | Public API for embedding |
| Diff editor | src/vs/editor/contrib/diff/ | Compare files side-by-side |

## CONVENTIONS

### Browser Layer Only
Editor DOM operations restricted to browser/electron-sandbox layers.
- Use `DOM.getWindow()` for multi-window support
- No direct `document.getElementById()` access

### Language Services
- Language-specific features in `contrib/languages/`
- Shared language APIs in `common/languages/`
- Extension points via `ILanguageFeature` interface

### Standalone API
- Public API in `standalone/` directory
- Mirror of VS Code's editor API
- Used in web-based editors

## ANTI-PATTERNS

### NEVER
- Access editor DOM from node/electron layers
- Modify text model directly without transactions
- Bypass language service APIs