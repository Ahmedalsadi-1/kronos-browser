# PLATFORM ABSTRACTIONS

**Generated:** 2026-01-14
**Commit:** local-dev
**Branch:** local

## OVERVIEW
Platform abstraction layer providing unified APIs across different operating systems. File system, dialogs, configuration, and native integrations.

## STRUCTURE
```
src/vs/platform/
├── files/             # File system operations
├── dialogs/           # Native dialogs (open, save, etc.)
├── configuration/     # Settings and preferences
├── telemetry/         # Usage analytics
├── environment/       # OS and environment detection
├── storage/           # Local storage APIs
└── extensions/        # Extension management
```

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| File system | src/vs/platform/files/ | IFileService, URI handling |
| Configuration | src/vs/platform/configuration/ | Settings, preferences, profiles |
| Dialogs | src/vs/platform/dialogs/ | Open/save dialogs, message boxes |
| Telemetry | src/vs/platform/telemetry/ | Usage data, error reporting |
| Environment | src/vs/platform/environment/ | OS detection, paths, variables |

## CONVENTIONS

### URI Handling
- All file paths use `URI` class
- Platform-specific path separators abstracted
- Cross-platform file operations

### Configuration Scopes
- User: `ConfigurationScope.USER`
- Workspace: `ConfigurationScope.WORKSPACE`
- Language: `ConfigurationScope.LANGUAGE`

### Extension Management
- Extension lifecycle in `extensions/`
- Extension API in `vscode` namespace
- Extension marketplace integration

## ANTI-PATTERNS

### NEVER
- Use platform-specific path operations directly
- Access native APIs bypassing abstraction layer
- Hardcode OS-specific paths