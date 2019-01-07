/// <reference types="node" />
import WebSocket = require('ws');
import http = require('http');
import { Type } from 'ims-core';
export interface ImsWsClientOptions extends WebSocket.ClientOptions {
    address?: string;
}
export declare abstract class WsClient {
    ws: WebSocket;
    constructor(ws: WebSocket);
    abstract onUpgrade(request: http.IncomingMessage): any;
    abstract onPing(data: Buffer): any;
    abstract onPong(data: Buffer): any;
    abstract onMessage(data: WebSocket.Data): any;
    abstract onUnexpectedResponse(request: http.ClientRequest, response: http.IncomingMessage): any;
    abstract onError(err: Error): any;
    abstract onClose(code: number, reason: string): any;
    abstract onOpen(): any;
}
export declare class WsClientDefault extends WsClient {
    onUpgrade(request: http.IncomingMessage): any;
    onPing(data: Buffer): any;
    onPong(data: Buffer): any;
    onMessage(data: WebSocket.Data): any;
    onUnexpectedResponse(request: http.ClientRequest, response: http.IncomingMessage): any;
    onError(err: Error): any;
    onClose(code: number, reason: string): any;
    onOpen(): any;
}
export declare class ImsWsClient {
    typeClient: Type<WsClient>;
    client: WsClient;
    constructor(opt: ImsWsClientOptions, typeClient?: Type<WsClient>);
}
