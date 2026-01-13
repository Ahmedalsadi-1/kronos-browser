# VOID CHAT INTEGRATION - AI FEATURES

**Generated:** 2026-01-12
**Commit:** local-dev
**Branch:** local

## OVERVIEW
AI chat integration in VS Code workbench. Streaming responses, multiple LLM providers, inline code blocks.

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| Chat UI | void/src/vs/workbench/contrib/chat/browser/ | Chat panel, input, messages |
| Chat logic | void/src/vs/workbench/contrib/chat/common/ | Providers, streaming, models |
| Chat providers | void/src/vs/workbench/contrib/chat/common/* | OpenAI, Anthropic, Google, Ollama, Groq |

## CONVENTIONS

### Provider Support
Multiple LLM providers supported:
- `@anthropic-ai/sdk` - Anthropic Claude
- `@google/genai` - Google Gemini
- `openai` - OpenAI GPT
- `ollama` - Local Ollama
- `groq-sdk` - Groq

### Streaming
- Server-Sent Events (SSE) for streaming responses
- `@c4312/eventsource-umd` for EventSource support

## COMMANDS
No dedicated commands - runs as part of void build system.
