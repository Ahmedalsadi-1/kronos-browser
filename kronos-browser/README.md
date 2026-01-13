# Kronos Browser

The Kronos Browser is an Electron application that serves as a shell for various other projects, including `kron-desktop`, `BrowserOS-agent`, and an integrated terminal.

## Development

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
