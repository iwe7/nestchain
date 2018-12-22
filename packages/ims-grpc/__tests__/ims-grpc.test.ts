import 'reflect-metadata';
import { GrpcServer, GrpcClient, GrpcRouter, injector } from 'ims-grpc';

let port = 50000;
let address = () => `0.0.0.0:${++port}`;
@GrpcRouter('Greeter')
export class Greeter {
  @GrpcRouter()
  sayHello(call, callback) {
    callback(null, { message: 'greeter' });
  }
}

@GrpcServer({
  fileName: __dirname + '/test.proto',
  router: [Greeter],
  address: address(),
})
export class TestGrpc {}

@GrpcClient({
  fileName: __dirname + '/test.proto',
  address: '0.0.0.0:50001',
})
export class TestGrpcClient {
  @GrpcClient({
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
