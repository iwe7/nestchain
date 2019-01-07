/// <reference types="node" />
import { MultiaddrResult } from '../visitor';
import net = require('net');
export declare function createTcpClient(options: MultiaddrResult): net.Socket;
