/// <reference types="node" />
import { ImsUdpSocket as ImsUdpClientSocket } from 'ims-udp-server';
import dgram = require('dgram');
import net = require('net');
import { Type } from 'ims-core';
export declare abstract class ImsUdpSocket extends ImsUdpClientSocket {
    port: number;
    address: string;
    abstract send(data: Buffer | string | Uint8Array | any[]): any;
}
export declare class ImsUdpSocketDefault extends ImsUdpSocket {
    onClose(): any;
    onError(err: Error): any;
    onListening(): any;
    onMessage(msg: Buffer, rinfo: net.AddressInfo): any;
    send(data: Buffer | string | Uint8Array): void;
}
export interface ImsUdpServerOptions extends dgram.SocketOptions {
    port: number;
    host: string;
}
export declare class ImsUdpClient {
    typeSocket: Type<ImsUdpSocket>;
    socket: ImsUdpSocket;
    constructor(opt: ImsUdpServerOptions, typeSocket?: Type<ImsUdpSocket>);
    send(data: Buffer | string | Uint8Array): void;
}
