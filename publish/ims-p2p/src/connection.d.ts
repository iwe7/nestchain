/// <reference types="node" />
import { TypeDecorator } from 'ims-decorator';
export declare const ConnectionMetadataKey = "ConnectionMetadataKey";
import { NetConnectOpts } from 'net';
export declare type ConnectionOptions = NetConnectOpts;
export interface ConnectionDecoratory {
    (opt: ConnectionOptions): TypeDecorator;
}
export declare const Connection: ConnectionDecoratory;
