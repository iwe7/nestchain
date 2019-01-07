/// <reference types="node" />
import socket = require('socket.io');
declare const _default: (app: any, key: string, cert: string) => {
    server: import("http").Server;
    io: socket.Server;
    https: import("https").Server;
    httpsIo: socket.Server;
};
export default _default;
