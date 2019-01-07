"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_http_client_1 = require("ims-http-client");
const ims_ws_client_1 = require("ims-ws-client");
class ImsP2pClient {
    constructor(host, port) {
        this.http = new ims_http_client_1.ImsHttpClient({
            host: host,
            port: port,
        });
        this.ws = new ims_ws_client_1.ImsWsClient({
            address: `ws://${host}:${port}`,
        });
    }
}
exports.ImsP2pClient = ImsP2pClient;
