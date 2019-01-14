export abstract class Greeter {
  abstract SayHello(req: HelloRequest): HelloReply;
}
export interface HelloRequest {}
export interface HelloReply {}
