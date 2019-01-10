export abstract class Channel {
  abstract emit(eventName: string, ...args: any[]): void;
  abstract open(channel: number, initiator: boolean): void;
}
export interface ChannelOpts {
  chunked?: boolean;
  halfOpen?: boolean;
  lazy?: boolean;
}
