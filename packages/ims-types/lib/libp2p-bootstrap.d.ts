declare module 'libp2p-bootstrap' {
  import { EventEmitter } from 'events';
  class Bootstrap extends EventEmitter {
    static tag: 'bootstrap';
    constructor(options);
    start(callback): any;
    stop(callback): any;
  }
  export = Bootstrap;
}
