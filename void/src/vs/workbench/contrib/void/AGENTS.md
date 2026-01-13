# VOID CONTRIBUTION - CUSTOM AI/EDITOR FEATURES

**Generated:** 2026-01-12
**Commit:** local-dev
**Branch:** local

## OVERVIEW
Custom AI and editor features forked into VS Code. Microsoft header requirement removed, extends workbench with new capabilities.

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| AI features | . | Core functionality |
| Editor integrations | . | Workbench extensions |
| React components | . | UI layer (requires build step) |

## CONVENTIONS

### React Build
React files require build step before development:
```bash
cd void/src/vs/workbench/contrib/void/browser/react
node build.js          # Build React to JS
node build.js --watch   # Watch for changes
```

### No Microsoft Header
- Standard VS Code files require Microsoft copyright header
- **void/**: Header requirement removed**

## ANTI-PATTERNS

- **NEVER** add Microsoft copyright header (void/ exception)
- **NEVER** modify React directly - edit .tsx, then build

## COMMANDS
```bash
cd void/src/vs/workbench/contrib/void

# Build React
npm run buildreact          # Build React components once
npm run watchreact          # Watch and rebuild React
npm run watchreactd         # Watch with deemon (daemon)
```
