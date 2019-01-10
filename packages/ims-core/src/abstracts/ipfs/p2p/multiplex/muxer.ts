export abstract class MultiplexMuxer {
  abstract emit(eventName: string, ...args: any[]): void;
  abstract newStream(): Promise<any>;
  abstract end(err: Error): Promise<void>;
}
