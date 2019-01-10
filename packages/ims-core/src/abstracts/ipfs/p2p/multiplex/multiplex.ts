import { Duplex } from 'stream';
import { ChannelOpts, Channel } from './channel';
export abstract class Multiplex {
  abstract createStream(name: Buffer | string, opts: ChannelOpts): Channel;
  abstract receiveStream(name: Buffer | string, opts: ChannelOpts): Channel;
  abstract createSharedStream(name: Buffer | string, opts: ChannelOpts): Duplex;
  abstract cork(): void;
  abstract uncork(): void;
  abstract end(data: Buffer, enc: string): Promise<void>;
  abstract finalize(): void;
}
