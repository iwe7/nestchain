/// <reference types="node" />
import net = require('net');
import { Type } from 'ims-core';
export { Socket } from 'net';
export declare abstract class ImsNetSocket {
    socket: net.Socket;
    constructor(socket: net.Socket);
    abstract onClose(had_error: boolean): any;
    abstract onListener(): any;
    abstract onData(data: Buffer): any;
    abstract onDrain(): any;
    abstract onEnd(): any;
    abstract onError(err: Error): any;
    abstract onLookUp(err: Error, address: string, family: string | number, host: string): any;
    abstract onTimeout(): any;
}
export declare class ImsNetSocketDefault extends ImsNetSocket {
    onClose(had_error: boolean): any;
    onListener(): any;
    onData(data: Buffer): any;
    onDrain(): any;
    onEnd(): any;
    onError(err: Error): any;
    onLookUp(err: Error, address: string, family: string | number, host: string): any;
    onTimeout(): any;
}
export declare abstract class ImsNetServer<S extends ImsNetSocket = any> {
    server: net.Server;
    typeSocket: Type<S>;
    connection: S;
    constructor(server: net.Server, typeSocket?: Type<S>);
    abstract onClose(): any;
    abstract onError(err: Error): any;
    abstract onListening(): any;
    abstract onConnection(socket: net.Socket): any;
}
export declare class ImsNetServerDefault<S extends ImsNetSocket = any> extends ImsNetServer<S> {
    onClose(): void;
    onError(err: Error): void;
    onListening(): void;
    onConnection(socket: net.Socket): void;
}
export declare class ImsTcpServer<S extends ImsNetServer = any> {
    opt: net.ListenOptions;
    typeServer: Type<S>;
    server: S;
    constructor(opt: net.ListenOptions, typeServer?: Type<S>);
}
