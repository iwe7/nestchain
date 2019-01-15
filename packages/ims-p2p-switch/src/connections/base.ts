import { Subject } from 'ims-rxjs';
import { FsmEventFactory, FsmEvent } from 'ims-fsm';
import { EventEmitter } from 'events';
export class BaseConnection extends Subject<any> {
  state: FsmEvent;
  constructor(public fsmFactory: FsmEventFactory) {
    super();
  }

  getState() {
    return this.state._state;
  }

  close(err) {}
}
