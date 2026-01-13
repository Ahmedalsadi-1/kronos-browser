export class ConsoleService {
  private static instance: ConsoleService;

  private constructor() {}

  static getInstance(): ConsoleService {
    if (!ConsoleService.instance) {
      ConsoleService.instance = new ConsoleService();
    }
    return ConsoleService.instance;
  }

  emitConsoleEvent(type: string, message: string) {
    window.dispatchEvent(new CustomEvent('browser-console', {
      detail: { type, message }
    }));
  }
}

export default ConsoleService;
