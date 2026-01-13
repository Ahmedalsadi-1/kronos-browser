import React, { useState } from 'react';
import { TerminalComponent } from './Terminal';
import { Browser } from './Browser';

const PANELS = {
  BROWSER: 'browser',
  KRON_DESKTOP: 'kron-desktop',
  BROWSEROS_AGENT: 'browseros-agent',
  TERMINAL: 'terminal',
};

export const App = () => {
  const [activePanel, setActivePanel] = useState(PANELS.BROWSER);

  const renderPanel = () => {
    switch (activePanel) {
      case PANELS.BROWSER:
        return <Browser />;
      case PANELS.KRON_DESKTOP:
        return (
          <webview
            src="http://localhost:5173"
            className="w-full h-full border-none"
          />
        );
      case PANELS.BROWSEROS_AGENT:
        return (
          <webview
            src="http://localhost:3000/newtab.html"
            className="w-full h-full border-none"
          />
        );
      case PANELS.TERMINAL:
        return <TerminalComponent />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-gray-800 text-white p-5">
        <h1 className="text-2xl font-bold">Kronos Browser</h1>
        <nav className="mt-10">
          <button
            onClick={() => setActivePanel(PANELS.BROWSER)}
            className={`w-full text-left p-2 rounded ${
              activePanel === PANELS.BROWSER ? 'bg-gray-700' : ''
            }`}
          >
            Browser
          </button>
          <button
            onClick={() => setActivePanel(PANELS.KRON_DESKTOP)}
            className={`w-full text-left p-2 rounded ${
              activePanel === PANELS.KRON_DESKTOP ? 'bg-gray-700' : ''
            }`}
          >
            Kron Desktop
          </button>
          <button
            onClick={() => setActivePanel(PANELS.BROWSEROS_AGENT)}
            className={`w-full text-left p-2 rounded ${
              activePanel === PANELS.BROWSEROS_AGENT ? 'bg-gray-700' : ''
            }`}
          >
            BrowserOS Agent
          </button>
          <button
            onClick={() => setActivePanel(PANELS.TERMINAL)}
            className={`w-full text-left p-2 rounded ${
              activePanel === PANELS.TERMINAL ? 'bg-gray-700' : ''
            }`}
          >
            Terminal
          </button>
        </nav>
      </div>
      <div className="flex-1">
        {renderPanel()}
      </div>
    </div>
  );
};
