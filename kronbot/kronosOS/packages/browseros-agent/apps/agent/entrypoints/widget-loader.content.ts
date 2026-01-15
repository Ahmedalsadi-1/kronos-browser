export default defineContentScript({
  matches: ['<all_urls>'],
  cssInjectionMode: 'ui',
  
  main() {
    const injectWidget = () => {
      const iframeId = 'kronos-agent-widget-iframe'
      if (document.getElementById(iframeId)) return

      console.log('[Kronos Agent] Injecting widget...')

      const iframe = document.createElement('iframe')
      iframe.id = iframeId
      iframe.src = chrome.runtime.getURL('widget.html')
      
      // Initial Style (Collapsed)
      Object.assign(iframe.style, {
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        width: '80px',
        height: '80px',
        border: 'none',
        borderRadius: '24px',
        zIndex: '2147483647',
        transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)', // Bouncy pop animation
        background: 'transparent',
        boxShadow: 'none',
        colorScheme: 'auto',
      })

      document.body.appendChild(iframe)
    }

    if (document.body) {
      injectWidget()
    } else {
      document.addEventListener('DOMContentLoaded', injectWidget)
    }

    // Listen for resize messages from the widget
    window.addEventListener('message', (event) => {
      if (event.data?.type === 'KRONOS_WIDGET_RESIZE') {
        const iframe = document.getElementById('kronos-agent-widget-iframe')
        if (!iframe) return

        const expanded = event.data.expanded
        
        if (expanded) {
          Object.assign(iframe.style, {
            width: '450px', 
            height: '650px',
            borderRadius: '18px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          })
        } else {
          Object.assign(iframe.style, {
            width: '80px',
            height: '80px',
            borderRadius: '24px',
            boxShadow: 'none',
          })
        }
      }
    })

    // Listen for messages from background script
    browser.runtime.onMessage.addListener((message) => {
      if (message.type === 'TOGGLE_WIDGET') {
        const iframe = document.getElementById('kronos-agent-widget-iframe') as HTMLIFrameElement
        if (iframe) {
          // Send message to the iframe to toggle its internal state
          iframe.contentWindow?.postMessage({ type: 'TOGGLE_EXPAND' }, '*')
        }
      }
    })
  },
})
