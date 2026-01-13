const { io } = require('socket.io-client');

// Connect to the Socket.IO server
const socket = io('http://localhost:3001', {
  withCredentials: true,
  transports: ['websocket']
});

// Replace this with the URL you want to open
const targetUrl = 'http://localhost:6080/';

// Handle connection
socket.on('connect', () => {
  console.log('Connected to server');

    setTimeout(() => {
        console.log('Container stream started');
        console.log('Clicking on the screen');
    containerActions.click(50, 50);
    setTimeout(() => {
        containerActions.click(50, 50);
        setTimeout(() => {
            containerActions.click(50, 50);
        }, 200);
    }, 200);
  }, 2000);
  
  // Start the container stream
  socket.emit('start-stream', {
    url: targetUrl,
    source: 'ubuntu-docker-vnc'
  });
});

// Handle stream started event
socket.on('stream-started', () => {
  console.log('Container stream started');
  
  // Example sequence of actions
  // setTimeout(() => {
  //   containerActions.click(300, 300);
  //   setTimeout(() => {
  //     containerActions.type('Hello World');
  //   }, 2000);
  // }, 2000);
});

// Handle disconnect
socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

// Container control actions
const containerActions = {
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
  }
};

// Cleanup function
const cleanup = () => {
  socket.emit('stop-container');
  setTimeout(() => {
    socket.disconnect();
    process.exit(0);
  }, 1000);
};

// Handle script termination
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

// Export actions for external use
module.exports = containerActions;
