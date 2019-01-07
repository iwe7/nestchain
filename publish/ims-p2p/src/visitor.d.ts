/// <reference types="node" />
import { Visitor, MetadataDef } from 'ims-decorator';
import { ConnectionOptions } from './connection';
import { ListenOptions } from './listen';
import { ImsContext } from 'ims-decorator';
import net = require('net');
export declare class ImsP2pVisitor extends Visitor {
    visitConnection(it: MetadataDef<ConnectionOptions>, context: ImsContext): MetadataDef<net.NetConnectOpts>;
    visitListen(it: MetadataDef<ListenOptions>, context: ImsContext): MetadataDef<ListenOptions>;
}
