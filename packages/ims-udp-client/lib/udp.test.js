"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
let client = new index_1.ImsUdpClient({
    type: 'udp4',
    port: 3001,
    host: '127.0.0.1',
});
client.send('test');
