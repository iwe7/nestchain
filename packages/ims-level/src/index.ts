import levelup, { LevelUp } from 'levelup';
import leveldown, { LevelDown } from 'leveldown';
import {
  AbstractBatch,
  AbstractIteratorOptions,
  AbstractGetOptions,
  AbstractOptions,
} from 'abstract-leveldown';
import { Injectable, NgModule } from 'ims-core';

@Injectable()
export class ImsLevel {
  db: LevelUp<LevelDown>;
  constructor(public path: string, options?: any) {
    this.db = levelup(leveldown(path), options);
  }
  open(): Promise<void> {
    return this.db.open();
  }
  close(): Promise<void> {
    return this.db.close();
  }
  put(key: Buffer, value: Buffer, options?: AbstractOptions) {
    return this.db.put(key, value, options);
  }
  get(key: Buffer, options?: AbstractGetOptions) {
    return this.db.get(key, options);
  }
  del(key: Buffer, options?: AbstractOptions) {
    return this.db.del(key, options);
  }
  batch(arr: AbstractBatch[], options?: AbstractOptions) {
    return this.db.batch(arr, options);
  }
  isOpen(): boolean {
    return this.db.isOpen();
  }
  isClosed(): boolean {
    return this.db.isClosed();
  }
  createReadStream(options?: AbstractIteratorOptions) {
    return this.db.createReadStream(options);
  }
  createKeyStream(options?: AbstractIteratorOptions) {
    return this.db.createReadStream(options);
  }
  createValueStream(options?: AbstractIteratorOptions) {
    return this.db.createReadStream(options);
  }
}

@Injectable()
export class ImsLevelFactory {
  create(path: string, options?: any) {
    return new ImsLevel(path, options);
  }
}

@NgModule({
  providers: [ImsLevelFactory],
})
export class ImsLevelModule {}
