import { TypeDecorator } from 'ims-decorator';
import { IInjector } from 'ims-core';
export declare const ClientMetadataKey = "ClientMetadataKey";
export interface ClientOptions {
    address?: string[];
    router: IInjector;
}
export interface ClientDecorator {
    (opt?: ClientOptions): TypeDecorator;
}
export declare const Client: ClientDecorator;
