# 啥是 GRPC

RPC，即 Remote Procedure Call Protocol--远程过程调用协议，它是一种通过网络从远程计算机程序上请求服务，而不需要了解底层网络技术的协议。在客户端本地调用函数就像是在本地一样，而实际上是通过网络协议传输到服务端并计算然后得到返回值。RPC 采用 C/S 模式，请求程序是一个客户机，而服务提供程序就是一个服务器。

gRPC 是一个高性能、通用的开源 RPC 框架，基于 ProtoBuf（Protocol Buffers）序列化协议开发，且支持众多开发语言，如 Golang，Java，Python 等等。

# 啥是基于 ProtoBuf

Protocol Buffer 是一种轻便高效的结构化数据存储格式，可以用于结构化数据串行化，或者说序列化。很适合做数据存储或者 RPC 数据交换格式。可用于协议通信、数据存储等领域的与语言无关，平台无关，可扩展的序列化结构数据格式。

# 有啥好处

编写一次到处运行，实用跟实用本机函数一样方便，集群、分布式、区块链中非常实用。

# 编写 proto

```
syntax = "proto3";
package helloworld;
service Greeter {
  rpc SayHello (HelloRequest) returns (HelloReply) {}
}
message HelloRequest {
  string name = 1;
}
message HelloReply {
  string message = 1;
}
```

# 安装

```
yarn add ims-grpc
```

# 封装装饰器用于简化开发

- `GrpcServer`用于服务器端配置
- `GrpcRouter`用于微服务实现
- `GrpcClient`用于客户端配置
- `injector`依据配置文件生成响应功能实例

[demo]('./__tests__/ims-grpc.test.ts)

# 服务端

```ts
import 'reflect-metadata';
import { GrpcServer, GrpcRouter, injector } from 'ims-grpc';

let address = `0.0.0.0:50001`;
// 某个微服务
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
  address,
})
export class TestGrpc {}
// 启动服务端
injector(TestGrpc);
```

# 客户端

```ts
import 'reflect-metadata';
import { GrpcClient, injector } from 'ims-grpc';
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

let instance = injector(TestGrpcClient).greeter;

let time = new Date().getTime();
instance.sayHello({ name: 'hello' }, (err, res) => {
  if (err) throw err;
  console.log(res, new Date().getTime() - time);
});
```
