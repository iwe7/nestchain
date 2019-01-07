"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
const net = require("net");
class ImsP2pVisitor extends ims_decorator_1.Visitor {
    visitConnection(it, context) {
        if (ims_decorator_1.isClassMetadata(it)) {
            it.metadataFactory = function (type) {
                let server = net.createServer();
                server.on('close', () => { });
                server.on('connection', (socket) => {
                    socket.on('close', () => {
                        this['close']();
                    });
                    socket.on('connect', () => {
                        this['connect']();
                    });
                    socket.on('data', () => {
                        this['data']();
                    });
                    socket.on('drain', () => {
                        this['drain']();
                    });
                    socket.on('end', () => {
                        this['end']();
                    });
                    socket.on('error', () => {
                        this['error']();
                    });
                    socket.on('lookup', () => {
                        this['lookup']();
                    });
                    socket.on('timeout', () => {
                        this['timeout']();
                    });
                });
                server.on('error', (err) => { });
                server.on('listening', () => {
                    this['listening']();
                });
                context.regist('server', server);
                return type;
            };
        }
        return it;
    }
    visitListen(it, context) {
        if (ims_decorator_1.isClassMetadata(it)) {
            let server = context.get('server');
            server.listen(it.metadataDef);
        }
        return it;
    }
}
exports.ImsP2pVisitor = ImsP2pVisitor;
