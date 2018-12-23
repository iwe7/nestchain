import { Visitor, MetadataDef, isClassMetadata } from 'ims-decorator';
import { Type } from 'ims-core';
import { Server, Client, Packet } from 'mosca';

import { MqttServerOptions } from './decorator';
export class MqttVisitor extends Visitor {
  visitMqttServer(
    it: MetadataDef<MqttServerOptions>,
    parent: any,
    context: any,
    opts: any,
  ) {
    let options: MqttServerOptions = { ...it.metadataDef, ...opts };
    if (isClassMetadata(it)) {
      it.metadataFactory = function(type: Type<any>) {
        return class extends type {
          server: Server;
          constructor(...args: any[]) {
            super(...args);
            this.server = new Server(options);
            this.server.on('clientConnected', (client: Client) => {
              // 监听链接
              this.onClientConnected && this.onClientConnected(client);
            });
            this.server.on('clientDisConnected', (client: Client) => {
              // clientDisConnected
              this.onClientDisConnected && this.onClientDisConnected(client);
            });
            this.server.on('published', (packet: Packet, client: Client) => {
              // 当客户端有连接的时候，发布主题消息
              this.onPublished && this.onPublished(packet, client);
            });
            this.server.on('ready', () => {
              // ready
              this.onReady && this.onReady();
            });
            this.server.on('subscribed', (topic, client: Client) => {
              // subscribed
              this.onSubscribed && this.onSubscribed(topic, client);
            });
            this.server.on('unSubscribed', (topic, client: Client) => {
              // unSubscribed
              this.onUnSubscribed && this.onUnSubscribed(topic, client);
            });
          }
        };
      };
    }
    return it;
  }
}
