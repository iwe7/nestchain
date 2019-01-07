/// <reference types="node" />
import WebSocket = require('ws');
import http = require('http');
import { Type } from 'ims-core';
export declare abstract class WsConnection {
    ws: WebSocket;
    request: http.IncomingMessage;
    constructor(ws: WebSocket, request: http.IncomingMessage);
    abstract onUpgrade(request: http.IncomingMessage): any;
    abstract onPing(data: Buffer): any;
    abstract onPong(data: Buffer): any;
    abstract onMessage(data: WebSocket.Data): any;
    abstract onUnexpectedResponse(request: http.ClientRequest, response: http.IncomingMessage): any;
    abstract onError(err: Error): any;
    abstract onClose(code: number, reason: string): any;
    abstract onOpen(): any;
}
export declare class WsConnectionDefault extends WsConnection {
    onUpgrade(request: http.IncomingMessage): any;
    onPing(data: Buffer): any;
    onPong(data: Buffer): any;
    onMessage(data: WebSocket.Data): any;
    onUnexpectedResponse(request: http.ClientRequest, response: http.IncomingMessage): any;
    onError(err: Error): any;
    onClose(code: number, reason: string): any;
    onOpen(): any;
}
export declare abstract class WsServer {
    server: WebSocket.Server;
    typeConection: Type<WsConnection>;
    constructor(server: WebSocket.Server, typeConection?: Type<WsConnection>);
    abstract onMessage(data: Buffer): any;
    abstract onListening(): any;
    abstract onHeaders(headers: string[], request: http.IncomingMessage): any;
    abstract onError(err: Error): any;
    abstract onConnection(socket: WebSocket, request: http.IncomingMessage): any;
}
export declare class WsServerDefault extends WsServer {
    onListening(): any;
    onHeaders(headers: string[], request: http.IncomingMessage): any;
    onError(err: Error): any;
    onConnection(socket: WebSocket, request: http.IncomingMessage): any;
    onMessage(data: Buffer): void;
}
export declare class ImsWsServer {
    typeWsServer: Type<WsServer>;
    ws: WsServer;
    constructor(opt: WebSocket.ServerOptions, typeWsServer?: Type<WsServer>);
}
