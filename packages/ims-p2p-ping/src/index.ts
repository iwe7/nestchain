import { Subject } from 'rxjs';

export class ImsP2pPing extends Subject<any> {
  _stopped: boolean = false;
  constructor() {
    super();
  }

  start() {}

  stop() {}
}
