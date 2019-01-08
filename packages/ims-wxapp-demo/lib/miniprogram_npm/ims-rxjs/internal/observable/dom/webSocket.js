"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocketSubject_1 = require("./WebSocketSubject");
function webSocket(urlConfigOrSource) {
    return new WebSocketSubject_1.WebSocketSubject(urlConfigOrSource);
}
exports.webSocket = webSocket;
