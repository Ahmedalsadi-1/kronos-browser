# Kronos Browser - BrowserOS Agent Integration Checklist

## Phase 1: Core Infrastructure (Foundation)

- [ ] Create `BrowserOSBridge` Swift class
  - [ ] Implement as `NSObject` (for WKScriptMessageHandler conformance)
  - [ ] Create WebSocket client for communicating with controller server
  - [ ] Define message protocol matching controller extension format
  - [ ] Tab ID mapping (Chrome tab IDs ↔ WKWebView instances)

- [ ] Create `BrowserOSController` in Kronos Browser
  - [ ] Manage WebSocket connection lifecycle
  - [ ] Queue requests and handle responses
  - [ ] Action dispatching to extension
  - [ ] Response handling and error recovery
  - [ ] Heartbeat/keepalive mechanism

## Phase 2: Tab Management (Chrome API equivalents)

- [ ] Implement Swift equivalents for chrome.tabs API:
  - [ ] getActiveTab() - Find active WKWebView, return tab info
  - [ ] getTabs() - Collect all WKWebView instances, return tab list
  - [ ] openTab(url, active?, windowId?) - Create new WKWebView
  - [ ] switchTab(tabId) - Make WKWebView active/visible
  - [ ] closeTab(tabId) - Remove WKWebView from view hierarchy
  - [ ] groupTabs(tabIds, title?, color?) - Create tab groups (data model update)
  - [ ] ungroupTabs(tabIds) - Remove from groups
  - [ ] getTabGroups(windowId?) - List all tab groups
  - [ ] updateTabGroup(groupId, title?, color?) - Update group metadata

## Phase 3: Browser Interaction (chrome.browserOS API equivalents)

- [ ] Implement Swift equivalents for chrome.browserOS API:
  - [ ] getInteractiveSnapshot(tabId, options?)
    - [ ] Inject JavaScript to query DOM
    - [ ] Return nodes with nodeIds (sequential integers)
    - [ ] Each node: nodeId, type, name, rect, attributes
  - [ ] click(tabId, nodeId) - Click element by nodeId
  - [ ] inputText(tabId, nodeId, text) - Type into input field
  - [ ] clear(tabId, nodeId) - Clear input field value
  - [ ] scrollToNode(tabId, nodeId) - Scroll element into view
  - [ ] captureScreenshot(tabId, size?, showHighlights?, width?, height?)
    - [ ] Use WKSnapshotConfiguration
    - [ ] Return data URL or Base64 image
  - [ ] getPageLoadStatus(tabId) - Check webView.loading state
  - [ ] executeJavaScript(tabId, code) - Run JS in WKWebView
  - [ ] clickCoordinates(tabId, x, y) - Click at viewport coordinates
  - [ ] typeAtCoordinates(tabId, x, y, text) - Type at coordinates

## Phase 4: Preferences (chrome.browserOS preferences)

- [ ] Implement Swift equivalents:
  - [ ] getPref(name) - Read UserDefaults for "browseros.*" keys
  - [ ] setPref(name, value, pageId?) - Write to UserDefaults
  - [ ] getAllPrefs() - Return all "browseros.*" preferences
  - [ ] Add change observers for preference updates

## Phase 5: WebSocket Protocol

- [ ] Connect to controller server (ws://localhost:9224/controller)
- [ ] Implement request format: `{id, action, payload}`
- [ ] Handle response format: `{id, ok, data}` or `{id, ok, error}`
- [ ] Message routing to specific extensions (browser, kronbot, kronos-desktop)
- [ ] Timeout handling and retry logic
- [ ] Reconnection on disconnect

## Phase 6: UI Panels (Kronos Browser Sidebar)

- [ ] Create `KronbotPanelView` - Agent orchestration UI
  - [ ] Display agent status and activity
  - [ ] Agent selection and mode switching
  - [ ] Task creation and monitoring

- [ ] Create `KronosDesktopPanelView` - Desktop automation UI
  - [ ] Display desktop status
  - [ ] Action buttons (screenshot, navigate, execute)
  - [ ] VNC/remote desktop view

- [ ] Create `PlaywrightBrowserPanelView` - Playwright browser control
  - [ ] Browser state display
  - [ ] Playwright instance management
  - [ ] Navigation controls

- [ ] Create `ChatPanelView` - AI assistant chat interface
  - [ ] Message history display
  - [ ] Streaming responses
  - [ ] Input field and send button

- [ ] Create `VoidIDEPanelView` - IDE integration
  - [ ] File browser tree
  - [ ] File open/edit controls
  - [ ] Terminal access button

- [ ] Update `SidebarManager` to manage panel visibility
  - [ ] Panel registration system
  - [ ] Toggle panel visibility
  - [ ] Panel state persistence

## Phase 7: Embedded Server

- [ ] Decide on embedding approach:
  - Option A: Bundle BrowserOS agent as macOS framework
  - Option B: Use local Node.js subprocess with ProcessManager
  - Option C: Build Swift-based MCP server directly in app
- [ ] Start server on app launch
- [ ] Stop server on app termination
- [ ] Handle server crashes and restart

## Phase 8: Chat & Coding Agents

- [ ] Create `ChatService` for AI communication
  - [ ] SSE (Server-Sent Events) for streaming
  - [ ] Message queue and deduplication
  - [ ] Browser context transmission (tab info, URL)
  - [ ] Agent routing (browserOS agent → Kronbot → Kronos Desktop → Playwright)

- [ ] Create `CodingAgent` service
  - [ ] MCP client for multiple servers
  - [ ] Tool discovery and registration
  - [ ] Task decomposition and orchestration
  - [ ] Result aggregation and display

## Phase 9: Void IDE Integration

- [ ] Void IDE location management (find .app)
  - [ ] VS Code extension API (if using extension)
  - [ ] File operations (open, read, write)
  - [ ] Command execution (terminal commands)
  - [ ] IPC bridge (WebSocket or stdio)

## Phase 10: Testing & Validation

- [ ] Unit tests for each adapter
- [ ] Integration tests with controller extension
- [ ] Manual testing of all panel interactions
- [ ] Stress testing (multiple tabs, concurrent actions)
- [ ] Performance monitoring (memory, CPU)

## Phase 11: Error Handling

- [ ] WebSocket disconnection recovery
- [ ] Action failure retry logic
- [ ] Graceful degradation (show toast, log error, continue)
- [ ] User-facing error messages
- [ ] Debug mode with detailed logging

## Phase 12: Documentation

- [ ] Architecture documentation
- [ ] API reference for Swift classes
- [ ] Integration guide for future developers
- [ ] Troubleshooting section

## Priority Order

1. **Phase 1** - Infrastructure foundation
2. **Phase 3** - Core browser automation (most critical)
3. **Phase 6** - UI panels (user-facing)
4. **Phase 5** - WebSocket communication (enables all)
5. **Phase 2** - Tab management (supports automation)
6. **Phase 4** - Preferences (user settings)
7. **Phase 8** - Chat agent (AI features)
8. **Phase 7** - Embedded server decision
9. **Phase 9** - Void IDE (advanced feature)
10. **Phase 10** - Testing (quality assurance)
11. **Phase 11** - Error handling (reliability)
12. **Phase 12** - Documentation (maintainability)

## Success Criteria

- [ ] Extension loads in Kronos Browser Chrome without modifications
- [ ] All panel views render correctly
- [ ] GetInteractiveSnapshot returns consistent nodeIds
- [ ] Click actions work reliably
- [ ] Screenshots capture and display
- [ ] Chat agent responds to queries
- [ ] No memory leaks (verified with Instruments)
- [ ] All agents can communicate through MCP servers
