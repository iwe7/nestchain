import { Router, On } from 'ims-protocol';

@Router()
export class MessageRouter {
  @On({ type: 'connect' })
  onConnect(...args: any[]) {
    console.log(args);
  }
}
