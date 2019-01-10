export abstract class Bootstrap {
  abstract start(): Promise<void>;
  abstract stop(): Promise<void>;
}
