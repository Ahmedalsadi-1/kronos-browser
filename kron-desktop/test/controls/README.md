# Browser Controls Test

This directory contains tools for testing browser control actions:

1. `browser-control.js` - Socket.IO client for browser automation
2. `index.html` - Visual test page for browser actions

## Quick Start

1. Start local server:
```bash
python3 -m http.server 8000
```

2. Visit `http://localhost:8000`

## Browser Control API

The `browser-control.js` provides:

```javascript
// Click at coordinates
browserActions.click(x, y);

// Type text
browserActions.type('text');

// Scroll page
browserActions.scroll('up' | 'down');
```

Connects to Socket.IO server at `localhost:3001` and provides real-time browser control through WebSocket communication.

## Test Page Features

- Canvas: Shows click positions with coordinates
- Text Input: Tests keyboard input
- Actions Log: Displays all interactions
  - Click coordinates
  - Typed text
  - Scroll events
