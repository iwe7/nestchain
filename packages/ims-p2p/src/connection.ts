import { makeDecorator, TypeDecorator } from 'ims-decorator';
export const ConnectionMetadataKey = 'ConnectionMetadataKey';
import { NetConnectOpts } from 'net';
export type ConnectionOptions = NetConnectOpts;
export interface ConnectionDecoratory {
  (opt: ConnectionOptions): TypeDecorator;
}
export const Connection: ConnectionDecoratory = makeDecorator(
  ConnectionMetadataKey,
  'visitConnection',
  dir => dir,
);
