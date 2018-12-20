export class ImsBlcok {
  private state: any = {
    lastBlock: {},
    lastReceipt: null,
    loaded: false,
    cleanup: false,
    isActive: false,
  };
  get isCleaning(): boolean {
    return this.state.cleanup;
  }
  get isLoaded(): boolean {
    return this.state.loaded;
  }
  constructor() {}

  lastBlock() {}

  lastReceipt() {}

  isActive() {}

  onNewBlock() {}

  cleanup() {}
}
