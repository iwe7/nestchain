/// <reference types="node" />
import { MultiaddrResult } from '../visitor';
import net = require('net');
export declare function createTcpServer(options: MultiaddrResult): net.Server;
