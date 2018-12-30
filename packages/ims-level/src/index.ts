import levelup from 'levelup';
import path = require('path');
import leveldown, { LevelDown } from 'leveldown';
import encode = require('encoding-down');
import { ROOT } from 'ims-const';
import { ErrorCallback } from 'abstract-leveldown';
export class Level extends levelup {
  static db: LevelDown;
  constructor(options: any = {}, callback?: ErrorCallback) {
    super(encode(Level.db, options), options, callback);
  }
  static destroy(location: string, cb: ErrorCallback) {
    this.db.destory(location, cb || function() {});
  }
  static repair(location: string, cb: ErrorCallback) {
    this.db.repair(location, cb || function() {});
  }
  static errors = levelup.errors;
}
Level.db = leveldown(path.join(ROOT, 'www/data/coredb'));
export default Level;
