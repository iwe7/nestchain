import SCWorker = require('socketcluster/scworker');
import { SCServer, SCServerSocket } from 'socketcluster-server';
import { createServer } from 'http';
import express = require('express');
export class P2pWorker extends SCWorker {
  run() {
    console.log('   >> Worker PID:', process.pid);
    let app = express();
    let httpServer = this.httpServer;
    let scServer = this.scServer;
    httpServer.on('request', app);
    scServer.on('handshake' as any, socket => {
      // todo 握手
      socket.on('message', message => {
        // todo 通信
      });
    });
    scServer.on('connection', socket => {
      // todo 链接操作
      socket.on('disconnect', () => {
        // todo 取消链接操作
      });
    });
    scServer.on(
      'connection',
      (
        socket: SCServerSocket,
        serverSocketStatus: SCServer.SCServerSocketStatus,
      ) => {
        socket.on('disconnect', () => {});
      },
    );
  }
}
new P2pWorker();
