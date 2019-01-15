import { Subject } from 'rxjs';
import { Injectable } from 'ims-core';

@Injectable({
  providedIn: 'root',
})
export class ImsP2pPing extends Subject<any> {
  _stopped: boolean = false;
  constructor(
    /**
     * 流复用器
     */
    public swarm: any,
    public peer: any,
  ) {
    super();
  }

  start() {}

  stop() {}
}
