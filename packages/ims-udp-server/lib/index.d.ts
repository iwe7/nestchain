/// <reference types="node" />
import dgram = require('dgram');
import net = require('net');
import { Type } from 'ims-core';
export declare abstract class ImsUdpSocket {
    socket: dgram.Socket;
    constructor(socket: dgram.Socket);
    abstract onClose(): any;
    abstract onError(err: Error): any;
    abstract onListening(): any;
    abstract onMessage(msg: Buffer, rinfo: net.AddressInfo): any;
}
export declare class ImsUdpSocketDefault extends ImsUdpSocket {
    onClose(): any;
    onError(err: Error): any;
    onListening(): any;
    onMessage(msg: Buffer, rinfo: net.AddressInfo): any;
}
export interface ImsUdpServerOptions extends dgram.SocketOptions {
    port: number;
    host: string;
}
export declare class ImsUdpServer {
    typeSocket: Type<ImsUdpSocket>;
    socket: ImsUdpSocket;
    constructor(opt: ImsUdpServerOptions, typeSocket?: Type<ImsUdpSocket>);
}
