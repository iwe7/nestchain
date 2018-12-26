import 'reflect-metadata';
import { Server, Client, Router, injector } from 'ims-grpc';

let port = 50000;
let address = () => `0.0.0.0:${++port}`;
@Router('Greeter')
export class Greeter {
  @Router()
  sayHello(call, callback) {
    callback(null, { message: 'greeter' });
  }
}

@Server({
  fileName: __dirname + '/test.proto',
  router: [Greeter],
  address: address(),
})
export class TestGrpc {}

@Client({
  fileName: __dirname + '/test.proto',
  address: '0.0.0.0:50001',
})
export class TestGrpcClient {
  @Client({
    path: 'helloworld.Greeter',
  })
  greeter: any;
}

let server = injector(TestGrpc);
// 改变参数
let server2 = injector(TestGrpc, {
  address: address(),
});

let client = injector(TestGrpcClient);
// 改变参数
let client2 = injector(TestGrpcClient, {
  address: '0.0.0.0:50002',
});

let instance = client.greeter;
let instance2 = client2.greeter;

let time = new Date().getTime();
instance.sayHello({ name: 'hello' }, (err, res) => {
  if (err) throw err;
  console.log(res, new Date().getTime() - time);
});

instance2.sayHello({ name: 'hello' }, (err, res) => {
  if (err) throw err;
  console.log(res, new Date().getTime() - time);
});
