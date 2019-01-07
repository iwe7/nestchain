"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grpc_client_options_1 = require("./grpc-client.options");
function imsMicro(app) {
    app.connectMicroservice(grpc_client_options_1.grpcClientOptions);
    return app;
}
exports.imsMicro = imsMicro;
