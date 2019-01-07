"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
const mosca_1 = require("mosca");
class MqttVisitor extends ims_decorator_1.Visitor {
    visitMqttServer(it, parent, context, opts) {
        let options = { ...it.metadataDef, ...opts };
        if (ims_decorator_1.isClassMetadata(it)) {
            it.metadataFactory = function (type) {
                return class extends type {
                    constructor(...args) {
                        super(...args);
                        this.server = new mosca_1.Server(options);
                        this.server.on('clientConnected', (client) => {
                            this.onClientConnected && this.onClientConnected(client);
                        });
                        this.server.on('clientDisConnected', (client) => {
                            this.onClientDisConnected && this.onClientDisConnected(client);
                        });
                        this.server.on('published', (packet, client) => {
                            this.onPublished && this.onPublished(packet, client);
                        });
                        this.server.on('ready', () => {
                            this.onReady && this.onReady();
                        });
                        this.server.on('subscribed', (topic, client) => {
                            this.onSubscribed && this.onSubscribed(topic, client);
                        });
                        this.server.on('unSubscribed', (topic, client) => {
                            this.onUnSubscribed && this.onUnSubscribed(topic, client);
                        });
                    }
                };
            };
        }
        return it;
    }
}
exports.MqttVisitor = MqttVisitor;
