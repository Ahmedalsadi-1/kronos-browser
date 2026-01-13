const { io } = require('socket.io-client');

// Connect to the Socket.IO server
const socket = io('http://localhost:3001', {
  withCredentials: true,
  transports: ['websocket']
});

// Replace this with the URL you want to open
const targetUrl = 'http://localhost:8000/';

// Handle connection
socket.on('connect', () => {
  console.log('Connected to server');
  
  // Start the browser with the target URL
  socket.emit('start-stream', {
    url: targetUrl,
    source: 'chrome-puppeteer'
  });
});

// Handle stream started event
socket.on('stream-started', () => {
  console.log('Browser stream started');
  
  // Perform actions after stream starts
  setTimeout(() => {
    browserActions.click(300, 300);
    setTimeout(() => {
      browserActions.click(250, 115);
      setTimeout(() => {
        browserActions.click(650, 115);
        setTimeout(() => {
          browserActions.type('Hello World');
          setTimeout(() => {
            browserActions.type('\n');
          }, 2000);
        }, 2000); 
      }, 2000); 
    }, 2000); 
  }, 2000); 
  // browserActions.type('Hello World');
  // browserActions.scroll('down');
  // browserActions.scroll('down');
  // browserActions.scroll('down');
});

// Handle screenshots
// socket.on('screenshot', (base64Image) => {
//   console.log('Received screenshot update');
//   // You could save these screenshots or process them as needed
// });

// Handle disconnect
socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

// Example functions to control the browser
const browserActions = {
  click: (x, y) => {
    socket.emit('browser-action', {
      action: 'click',
      params: { x, y }
    });
  },
  
  type: (text) => {
    socket.emit('browser-action', {
      action: 'type',
      params: { text }
    });
  },
  
  scroll: (direction) => {
    if (direction !== 'up' && direction !== 'down') {
      console.error('Direction must be "up" or "down"');
      return;
    }
    socket.emit('browser-action', {
      action: 'scroll',
      params: { direction }
    });
  }
};

// Example usage:
// browserActions.click(200, 300);
// browserActions.type('Hello World');
// browserActions.scroll('down');

// Cleanup function
const cleanup = () => {
  socket.emit('stop-browser');
  setTimeout(() => {
    socket.disconnect();
    process.exit(0);
  }, 1000);
};

// Handle script termination
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

// Export actions for external use
module.exports = browserActions;
