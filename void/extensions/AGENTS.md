# VS CODE EXTENSIONS

**Generated:** 2026-01-14
**Commit:** local-dev
**Branch:** local

## OVERVIEW
Official VS Code extensions and extension development tools. Language support, debuggers, themes, and extension APIs.

## STRUCTURE
```
extensions/
├── typescript-language-features/    # TS/JS support
├── git/                             # Git integration
├── markdown/                        # Markdown editing
├── python/                         # Python support
├── docker/                         # Docker integration
└── [language-extension]/            # Other language packs
```

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| TypeScript | extensions/typescript-language-features/ | TS server, completions |
| Git | extensions/git/ | Version control integration |
| Markdown | extensions/markdown/ | Preview, extensions |
| Python | extensions/python/ | Language server, debugging |
| Extension API | extensions/*/src/ | Extension development patterns |

## CONVENTIONS

### Extension Structure
- `package.json` for extension metadata
- `src/` directory for source code
- `out/` directory for compiled code
- Test files in `test/` directory

### Extension API
- Use `vscode` namespace for APIs
- Extension activation in `activate()` function
- Cleanup in `deactivate()` function

### Language Support
- Language server protocol (LSP) integration
- Grammar files for syntax highlighting
- Semantic highlighting support

## ANTI-PATTERNS

### NEVER
- Access VS Code internal APIs directly
- Block the main thread in extensions
- Use deprecated extension APIs