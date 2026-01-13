import { io, Socket } from "socket.io-client";
import { StreamingSource } from "@/types/api.types.ts";

class SocketService {
  private static instance: SocketService;
  private socket: Socket | null = null;
  private source: StreamingSource = 'chrome-puppeteer';

  private constructor() {}

  static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  setSource(source: StreamingSource) {
    this.source = source;
  }

  getSource(): StreamingSource {
    return this.source;
  }

  connect() {
    if (!this.socket) {
      this.socket = io('/', {
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        timeout: 30000
      });

      this.socket.on('connect_error', (error) => {
        window.dispatchEvent(new CustomEvent('browser-console', {
          detail: {
            type: 'error',
            message: `Socket connection error: ${error.message}`
          }
        }));
      });
    }
    return this.socket;
  }

  getSocket(): Socket | null {
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  emit(eventName: string, data?: any) {
    if (this.socket) {
      this.socket.emit(eventName, { ...data, source: this.source });
    }
  }
}

export default SocketService;
