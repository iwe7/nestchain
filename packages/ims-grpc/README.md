# `ims-grpc`

> TODO: description

## Usage

```ts
import 'reflect-metadata';
import { GrpcServer, GrpcClient, GrpcRouter, injector } from 'ims-grpc';

let port = 50000;
let address = () => `0.0.0.0:${++port}`;

// 处理单元
@GrpcRouter('Greeter')
export class Greeter {
  @GrpcRouter()
  sayHello(call, callback) {
    callback(null, { message: 'greeter' });
  }
}

// 服务端
@GrpcServer({
  fileName: __dirname + '/test.proto',
  router: [Greeter],
  address: address(),
})
export class TestGrpc {}

// 客户端
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

// 服务端实例
let server = injector(TestGrpc);
// 客户端实例
let client = injector(TestGrpcClient);

// 某个服务
let service = client.greeter;

let time = new Date().getTime();

// 调用发放
instance.sayHello({ name: 'hello' }, (err, res) => {
  if (err) throw err;
  console.log(res, new Date().getTime() - time);
});
```
