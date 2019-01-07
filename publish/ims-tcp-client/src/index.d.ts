/// <reference types="node" />
import net = require('net');
import { ImsNetSocket } from 'ims-tcp-server';
import { Type } from 'ims-core';
export declare class ImsTcpClient {
    opt: net.NetConnectOpts;
    typeSocket: Type<ImsNetSocket>;
    socket: ImsNetSocket;
    constructor(opt: net.NetConnectOpts, typeSocket?: Type<ImsNetSocket>);
}
