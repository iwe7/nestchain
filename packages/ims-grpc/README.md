# 啥是 GRPC

RPC，即 Remote Procedure Call Protocol--远程过程调用协议，它是一种通过网络从远程计算机程序上请求服务，而不需要了解底层网络技术的协议。在客户端本地调用函数就像是在本地一样，而实际上是通过网络协议传输到服务端并计算然后得到返回值。RPC 采用 C/S 模式，请求程序是一个客户机，而服务提供程序就是一个服务器。

gRPC 是一个高性能、通用的开源 RPC 框架，基于 ProtoBuf（Protocol Buffers）序列化协议开发，且支持众多开发语言，如 Golang，Java，Python 等等。

# 啥是基于 ProtoBuf

Protocol Buffer 是一种轻便高效的结构化数据存储格式，可以用于结构化数据串行化，或者说序列化。很适合做数据存储或者 RPC 数据交换格式。可用于协议通信、数据存储等领域的与语言无关，平台无关，可扩展的序列化结构数据格式。

# 有啥好处

编写一次到处运行，实用跟实用本机函数一样方便，集群、分布式、区块链中非常实用。

# 编写 proto

```proto
syntax = "proto3";

option java_multiple_files = true;
option java_package = "io.grpc.examples.helloworld";
option java_outer_classname = "HelloWorldProto";
option objc_class_prefix = "HLW";

package helloworld;

// The greeting service definition.
service Greeter {
  // Sends a greeting
  rpc SayHello (HelloRequest) returns (HelloReply) {}
}

// The request message containing the user's name.
message HelloRequest {
  string name = 1;
}

// The response message containing the greetings
message HelloReply {
  string message = 1;
}

```

# demo

```ts
import path = require('path');

@Injectable({
  providedIn: 'root',
})
export class Greeter {
  SayHello(req: HelloRequest): HelloReply {
    console.log(req);
    return {
      message: req.name,
    };
  }
}

export interface HelloRequest {
  name: string;
}
export interface HelloReply {
  message: string;
}

nodePlatform([]).then(res => {
  res.bootstrapModule(ImsGrpcModule).then(async res => {
    let grpcfac = res.injector.get(ImsGrpcServerFactory);
    let grpcClientFac = res.injector.get(ImsGrpcClientFactory);
    let grpc = await grpcfac.create(path.join(__dirname, 'hello.proto'), [
      Greeter,
    ]);
    let client = await grpcClientFac.create(
      path.join(__dirname, 'hello.proto'),
    );
    (client.Greeter as any).sayHello({ name: 'name' }, (err, res) => {
      console.log('Greeting:', res.message);
    });
  });
});
```
