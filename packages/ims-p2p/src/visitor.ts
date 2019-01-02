import { Visitor, MetadataDef, isClassMetadata } from 'ims-decorator';
import { ConnectionOptions } from './connection';
import { ListenOptions } from './listen';
import { ImsContext } from 'ims-decorator';
import { Type } from 'ims-core';
import net = require('net');

export class ImsP2pVisitor extends Visitor {
  visitConnection(it: MetadataDef<ConnectionOptions>, context: ImsContext) {
    if (isClassMetadata(it)) {
      it.metadataFactory = function(type: Type<any>) {
        let server = net.createServer();
        server.on('close', () => {});
        server.on('connection', (socket: net.Socket) => {
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
        server.on('error', (err: Error) => {});
        server.on('listening', () => {
          this['listening']();
        });
        context.regist('server', server);
        return type;
      };
    }
    return it;
  }
  visitListen(it: MetadataDef<ListenOptions>, context: ImsContext) {
    if (isClassMetadata(it)) {
      let server = context.get<net.Server>('server');
      server.listen(it.metadataDef);
    }
    return it;
  }
}
