import { Server, Client, Router, On, Send } from './decorator';
import { injector } from './visitor';
import 'reflect-metadata';

@Router()
export class ServerRouter {
  @On({ type: 'connect' })
  onConnect(...args: any[]) {
    this.sendData();
  }
  @On({ type: 'sendData' })
  onSendData(...args: any[]) {
    console.log(args);
  }

  @Send()
  sendData() {
    return 'test';
  }
}

@Server({
  address: '/ip4/127.0.0.1/tcp/3000',
  router: [ServerRouter],
})
export class TestServer {
  @Server()
  server: any;
}

@Client({
  router: [ServerRouter],
})
export class TestClient {
  @Client()
  client: any;
}

let server = injector(TestServer);
let client = injector(TestClient);
