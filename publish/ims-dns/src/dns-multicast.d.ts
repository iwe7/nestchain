/// <reference types="node" />
import { EventEmitter } from 'events';
import dgram = require('dgram');
export interface ImsMulticastDnsOptions {
    port?: number;
    type?: 'udp6' | 'udp4';
    ip?: string;
    host?: string;
    interface?: any;
    socket?: dgram.Socket;
    reuseAddr?: boolean;
}
export declare class ImsMulticastDns extends EventEmitter {
    static defaultOptions: ImsMulticastDnsOptions;
    constructor(opts?: ImsMulticastDnsOptions);
    static query(): void;
}
