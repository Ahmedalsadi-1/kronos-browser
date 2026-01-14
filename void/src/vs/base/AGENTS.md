# BASE UTILITIES

**Generated:** 2026-01-14
**Commit:** local-dev
**Branch:** local

## OVERVIEW
Foundation utilities and low-level services. Logging, async helpers, types, and shared functionality used across the entire codebase.

## STRUCTURE
```
src/vs/base/
├── common/            # Shared types and interfaces
├── browser/           # Browser-specific utilities
├── node/              # Node.js-specific utilities
├── test/              # Testing utilities
└── async/             # Async programming helpers
```

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| Logging | src/vs/base/common/log/ | ILogger, log service |
| Async helpers | src/vs/base/common/async/ | Promises, timeouts, intervals |
| Types | src/vs/base/common/types/ | Type definitions, guards |
| Browser utils | src/vs/base/browser/ | DOM helpers, timers |
| Node utils | src/vs/base/node/ | File system, process helpers |

## CONVENTIONS

### Logging
- Structured logging with severity levels
- Logger names follow file path structure
- No `[prefix]` tags (auto-added with file:line)

### Async Patterns
- Promises over callbacks
- `async/await` for async operations
- Error handling with try/catch

### Type Safety
- Strict TypeScript configuration
- Runtime type guards where needed
- No `any` types in core utilities

## ANTI-PATTERNS

### NEVER
- Use console.log for production logging
- Mix sync and async operations without proper handling
- Bypass type guards for performance