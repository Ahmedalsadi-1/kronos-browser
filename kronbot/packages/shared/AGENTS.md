# SHARED - CROSS-PACKAGE TYPES & UTILITIES

**Generated:** 2026-01-13
**Commit:** local-dev
**Branch:** local

## OVERVIEW
Shared TypeScript types and utilities. Used across all packages (bytebot-ui, bytebot-agent, bytebotd, bytebot-agent-cc). Must build before dependent packages.

## STRUCTURE
```
shared/src/
├── index.ts              # Main export file
├── types/               # Shared TypeScript types
└── utils/               # Shared utility functions
```

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| Main exports | src/index.ts | All public exports |
| Types | src/types/ | Shared interfaces/types |
| Utilities | src/utils/ | Helper functions |

## CONVENTIONS

### Build Order
- **MUST build first**: All dependent packages require this
- **Prep step**: Run `npm run build --prefix ../shared` before building other packages

### Exports
- **Single entry point**: All exports from `src/index.ts`
- **ESM + CJS**: Both module formats in `dist/`

## COMMANDS
```bash
cd packages/shared

# Build
npm run build            # TypeScript compilation to dist/

# Quality
npm run lint             # ESLint check
```

## ANTI-PATTERNS

### Build Dependency
- **NEVER build other packages before shared**: Type safety requires shared compiled first

## NOTES

### Package Dependency
All other packages import via:
```typescript
import { TypeName } from '@bytebot/shared';
```

Local package path in dependent package.json:
```json
{
  "dependencies": {
    "@bytebot/shared": "file:../shared"
  }
}
```
