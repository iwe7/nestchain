import { Subject } from 'ims-rxjs';
import { Injectable } from 'ims-core';
import { FsmEventFactory, FsmEvent } from 'ims-fsm';
import { ImsP2pCrypto } from 'ims-p2p-crypto';
import { ConnectionManager } from './connection_manager';
let fsm = require('./fsm.json');
@Injectable({
  providedIn: 'root',
})
export class ImsP2p extends Subject<any> {
  state: FsmEvent;
  constructor(
    public fsmFactory: FsmEventFactory,
    public connectionManager: ConnectionManager,
    public crypto: ImsP2pCrypto
  ) {
    super();
    this.state = this.fsmFactory.create('stoped', fsm);
    this.state.subscribe(
      ([type, evt]) => {
        console.log({ type, evt });
        switch (type) {
          case 'stopping':
            this.next('stopping');
            this.onStopping();
            break;
          case 'stopped':
            this.next('stopped');
            this.onStopped();
            break;
          case 'starting':
            this.next('starting');
            this.onStarting();
            break;
          case 'started':
            this.next('start');
            this.onStarted();
            break;
          default:
            console.log(type);
        }
        if (evt) {
          evt();
        }
      },
      (err: any) => {
        super.error(err);
      },
      () => {
        super.complete();
      },
    );
  }
  private onStopping() {}
  private onStopped() {}
  private onStarting() {}
  private onStarted() {}

  next(data: any) {
    super.next(data);
  }

  start() {
    this.state.emit('start');
  }

  stop() {
    this.state.emit('stop');
  }

  isStarted() {
    return this.state._state === 'started';
  }
}
