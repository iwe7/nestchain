export abstract class MulticastDNS {
  abstract start(): Promise<void>;
  abstract stop(): Promise<void>;
}
