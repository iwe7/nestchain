/// <reference types="node" />
import { MultiaddrResult } from './util';
import net = require('net');
export declare class ImsP2p {
    address: MultiaddrResult;
    servers: Map<string, MultiaddrResult>;
    clients: Map<string, net.Socket>;
    constructor(address: string, servers: string[]);
    initPing(): void;
    parse(str: string): any;
    stringify(type: string, data: any): string;
    send(server: net.Socket, type: string, data: any): void;
    initServer(): void;
    initClient(address: MultiaddrResult): net.Socket;
    handlerClientData(data: ImsP2pEvent, socket: net.Socket): void;
    handlerServerData(data: ImsP2pEvent<{
        address: string;
    }>, socket: net.Socket): void;
}
export interface ImsP2pEvent<T = any> {
    type: string;
    payload: T;
}
