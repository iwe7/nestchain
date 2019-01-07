"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_http_server_1 = require("ims-http-server");
const ims_ws_server_1 = require("ims-ws-server");
const path_1 = require("path");
const ims_const_1 = require("ims-const");
const json = require(path_1.join(ims_const_1.ROOT, 'www/data/config.json'));
class ImsP2pServer {
    constructor() {
        this.http = new ims_http_server_1.ImsHttpServer({
            host: json.host,
            port: json.http,
        });
        this.ws = new ims_ws_server_1.ImsWsServer({
            server: this.http.server.server,
        });
    }
}
exports.ImsP2pServer = ImsP2pServer;
