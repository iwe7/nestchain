import { TypeDecorator } from 'ims-decorator';
import { IInjector } from 'ims-core';
export declare const ServerMetadataKey = "ServerMetadataKey";
export interface ServerOptions {
    address?: string;
    router: IInjector;
}
export interface ServerDecorator {
    (opt?: ServerOptions): TypeDecorator;
}
export declare const Server: ServerDecorator;
