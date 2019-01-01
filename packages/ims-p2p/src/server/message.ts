import { Router, On } from 'ims-protocol';

@Router()
export class MessageRouter {
  @On({ type: 'connect' })
  onConnect(...args: any[]) {
    console.log(args);
  }

  @On({ type: 'message' })
  onMessage() {
    console.log('message');
  }

  @On({ type: 'listening' })
  onListening() {
    console.log('listening');
  }
}
