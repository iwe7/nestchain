"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
new index_1.ImsUdpServer({
    port: 3001,
    host: '127.0.0.1',
    type: 'udp4',
});
