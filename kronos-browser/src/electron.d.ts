export {};

declare global {
  interface Window {
    electron: {
      spawn: () => void;
      onData: (callback: (data: string) => void) => void;
      write: (data: string) => void;
    };
  }
}
