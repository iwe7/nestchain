import level = require('level');
import { Injectable } from 'ims-core';
@Injectable()
export class ImsLevel {
  db: any;
  constructor(public path: string) {
    this.db = level(path);
  }
  open() {
    return this.db.open();
  }
  close() {
    return this.db.close();
  }
  put() {}
  get() {}
  del() {}
  batch() {}
  isOpen() {}
  isClosed() {}
  createReadStream() {}
  createKeyStream() {}
  createValueStream() {}
  iterator() {}
}

function inherits(ctor, superCtor) {
  ctor.super_ = superCtor;
  ctor.prototype = Object.create(superCtor.prototype, {
    constructor: {
      value: ctor,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  });
}

class A {
  ddd: string = 'a';
}
class B {
  title: string = 'b';
}

let C = inherits(A, B);

let a = new A();
debugger;
