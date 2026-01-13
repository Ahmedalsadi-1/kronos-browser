# Kronos Browser

The Kronos Browser is an Electron application that serves as a shell for various other projects, including `kron-desktop`, `BrowserOS-agent`, and an integrated terminal.

## Development

### Prerequisites

Before running the Kronos Browser, you must start the following services in separate terminals:

1.  **`kron-desktop`:**
    ```bash
    cd ../kron-desktop
    npm run install:all
    npm start
    ```
    This will start the `kron-desktop` frontend on `http://localhost:5173`.

2.  **`BrowserOS-agent`:**
    ```bash
    cd ../BrowserOS-agent
    bun install
    bun run start:server
    ```
    This will start the `BrowserOS-agent` server on `http://localhost:9100`.

3.  **`BrowserOS-agent` UI:**
    ```bash
    cd ../BrowserOS-agent/apps/agent
    bun install
    bun run dev
    ```
    This will start the `BrowserOS-agent` UI on `http://localhost:3000`.

### Setup

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Run the Application:**
    ```bash
    npm start
    ```

### Project Structure

*   `src/main.ts`: The main Electron process.
*   `src/preload.ts`: The preload script for the Electron application.
*   `src/renderer.tsx`: The main React component that renders the UI.
*   `src/app.tsx`: The root React component that contains the main layout and panel switching logic.
*   `src/Terminal.tsx`: The integrated terminal component.
*   `src/Browser.tsx`: The browser component that uses a `<webview>` tag.
