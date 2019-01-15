import { Subject } from 'ims-rxjs';
import { Injectable } from 'ims-core';
import { FsmEventFactory, FsmEvent } from 'ims-fsm';
import { ImsP2pCrypto } from 'ims-p2p-crypto';
import { ConnectionManager } from './connection_manager';
import { P2pSwitchFactory } from 'ims-p2p-switch';
import { PeerBook, PeerIdFactory, PeerInfoFactory } from 'ims-peer';
@Injectable({
  providedIn: 'root',
})
export class ImsP2p extends Subject<any> {
  state: FsmEvent;
  constructor(
    public fsmFactory: FsmEventFactory,
    public connectionManager: ConnectionManager,
    public crypto: ImsP2pCrypto,
    public switchFactory: P2pSwitchFactory,
    public peerBook: PeerBook,
    public peerIdFactory: PeerIdFactory,
    public peerInfoFactory: PeerInfoFactory,
  ) {
    super();
    this.state = this.fsmFactory.create('stopped', {
      stopping: {
        done: 'stopped',
        abort: 'stopped',
        stop: 'stopping',
      },
      'stopping:leave': true,
      'stopping:enter': true,
      stopped: {
        start: 'starting',
        stop: 'stopped',
      },
      'stopped:leave': true,
      'stopped:enter': true,
      starting: {
        done: 'started',
        abort: 'stopped',
        stop: 'stopping',
      },
      'starting:leave': true,
      'starting:enter': true,
      started: {
        stop: 'stopping',
        start: 'started',
      },
      'started:leave': true,
      'started:enter': true,
    });
    this.state.subscribe(
      ([type, evt]) => {
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
