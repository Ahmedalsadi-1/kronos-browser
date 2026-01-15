

import { defineContentScript } from 'wxt/utils/define-content-script';
import browser from 'webextension-polyfill';

export default defineContentScript({
  matches: ['<all_urls>'],
  cssInjectionMode: 'ui',
  main() {
    const injectedUIContainerId = 'kronos-agent-injected-ui-container';

    function injectUI() {
      console.log('[Kronos Agent] Injecting UI...');
      let uiContainer = document.getElementById(injectedUIContainerId);

      if (!uiContainer) {
        uiContainer = document.createElement('div');
        uiContainer.id = injectedUIContainerId;
        document.body.appendChild(uiContainer);
      }

      // Load your UI framework (e.g., React) into this container
      // This is a simplified example. In a real scenario, you'd mount a React app here.
      uiContainer.innerHTML = `
        <style>
          #${injectedUIContainerId} {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 99999;
            pointer-events: none; /* Allows clicks to pass through by default */
            display: none; /* Hidden by default */
          }
          #${injectedUIContainerId}.visible {
            display: block;
          }
          .injected-content {
            background: rgba(0,0,0,0.7);
            color: white;
            padding: 10px;
            border-radius: 5px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            pointer-events: auto; /* Re-enable pointer events for the content */
          }
        </style>
        <div class="injected-content">
          <h1>Kronos Agent UI</h1>
          <p>This is an injected UI element.</p>
          <button id="closeKronosAgentUI">Close</button>
        </div>
      `;

      // Example: Add event listener to a button inside the injected UI
      const closeButton = document.getElementById('closeKronosAgentUI');
      if (closeButton) {
        closeButton.addEventListener('click', () => {
          if (uiContainer) {
            uiContainer.classList.remove('visible');
          }
        });
      }
    }

    // Function to toggle visibility
    function toggleUIVisibility() {
      const uiContainer = document.getElementById(injectedUIContainerId);
      if (uiContainer) {
        uiContainer.classList.toggle('visible');
      } else {
        injectUI();
        document.getElementById(injectedUIContainerId)?.classList.add('visible');
      }
    }

    // Listen for messages from the background script
    browser.runtime.onMessage.addListener((message) => {
      if (message.type === 'TOGGLE_INJECTED_UI') {
        toggleUIVisibility();
      }
    });

    // Initial injection if document is ready
    if (document.body) {
      // injectUI(); // Don't inject automatically, wait for toggle
    } else {
      document.addEventListener('DOMContentLoaded', injectUI);
    }

    console.log('[Kronos Agent] Content script loaded and ready to receive messages.');
  },
});