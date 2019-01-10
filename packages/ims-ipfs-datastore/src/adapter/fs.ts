import {
  Datastore,
  Injector,
  Key,
  KeyFactory,
  QueryResult,
  Query,
} from 'ims-core';
import path = require('path');
import fs = require('fs');
import mkdirp = require('mkdirp');
import { of } from 'ims-rxjs';
import waterfall = require('async/series');
import writeFile = require('write-file-atomic');
import each = require('async/each');
export interface FsDatastoreOptions {
  createIfMissing: boolean;
  errorIfExists: boolean;
  extension: string;
}
export class FsDatastore<T extends Buffer> extends Datastore<T> {
  path: string;
  opts: FsDatastoreOptions;
  keyFactory: KeyFactory;
  constructor(injector: Injector, location: string, opts: FsDatastoreOptions) {
    super();
    this.keyFactory = injector.get(KeyFactory);
    this.path = path.resolve(location);
    this.opts = Object.assign(
      {},
      {
        createIfMissing: true,
        errorIfExists: false,
        extension: '.data',
      },
      opts,
    );
    if (this.opts.createIfMissing) {
      this._openOrCreate();
    } else {
      this._open();
    }
  }

  close() {
    return of(void 0).toPromise();
  }

  open() {
    this._openOrCreate();
    return of(void 0).toPromise();
  }

  _open() {
    if (!fs.existsSync(this.path)) {
      throw new Error(`Datastore directory: ${this.path} does not exist`);
    }
    if (this.opts.errorIfExists) {
      throw new Error(`Datastore directory: ${this.path} already exists`);
    }
  }

  _create() {
    mkdirp.sync(this.path, { fs: fs });
  }

  _openOrCreate() {
    try {
      this._open();
    } catch (err) {
      if (err.message.match('does not exist')) {
        this._create();
        return;
      }
      throw err;
    }
  }

  _encode(key: Key): { dir: string; file: string } {
    const parent = key.parent().toString();
    const dir = path.join(this.path, parent);
    const name = key.toString().slice(parent.length);
    const file = path.join(dir, name + this.opts.extension);
    return {
      dir: dir,
      file: file,
    };
  }

  _decode(file: string): Key {
    const ext = this.opts.extension;
    if (path.extname(file) !== ext) {
      throw new Error(`Invalid extension: ${path.extname(file)}`);
    }

    const keyname = file
      .slice(this.path.length, -ext.length)
      .split(path.sep)
      .join('/');
    return this.keyFactory.create(keyname);
  }

  putRaw(key: Key, val: T): Promise<void> {
    const parts = this._encode(key);
    const file = parts.file.slice(0, -this.opts.extension.length);
    return new Promise((res, rej) => {
      waterfall(
        [
          cb => mkdirp(parts.dir, { fs: fs }, cb),
          cb => writeFile(file, val, cb),
        ],
        err => {
          if (err) rej(err);
          else res();
        },
      );
    });
  }

  put(key: Key, val: Buffer): Promise<void> {
    const parts = this._encode(key);
    return new Promise((res, rej) => {
      waterfall(
        [
          cb => mkdirp(parts.dir, { fs: fs }, cb),
          cb => writeFile(parts.file, val, cb),
        ],
        err => {
          if (err) {
            rej(err);
          } else {
            res();
          }
        },
      );
    });
  }

  getRaw(key: Key): Promise<T> {
    const parts = this._encode(key);
    let file = parts.file;
    file = file.slice(0, -this.opts.extension.length);
    return new Promise((res, rej) => {
      fs.readFile(file, (err, data: T) => {
        if (err) {
          rej(err);
        } else {
          res(data);
        }
      });
    });
  }
  get(key: Key): Promise<T> {
    const parts = this._encode(key);
    return new Promise((res, rej) => {
      fs.readFile(parts.file, (err, data: T) => {
        if (err) {
          rej(err);
        }
        res(data);
      });
    });
  }

  has(key: Key): Promise<boolean> {
    const parts = this._encode(key);
    return new Promise((res, rej) => {
      fs.access(parts.file, err => {
        res(!err);
      });
    });
  }

  delete(key: Key): Promise<any> {
    const parts = this._encode(key);
    return new Promise((res, rej) => {
      fs.unlink(parts.file, err => {
        if (err) {
          rej(err);
        }
        res();
      });
    });
  }

  batch() /* : Batch<Buffer> */ {
    const puts = [];
    const deletes = [];
    return {
      put(key /* : Key */, value /* : Buffer */) /* : void */ {
        puts.push({ key: key, value: value });
      },
      delete(key /* : Key */) /* : void */ {
        deletes.push(key);
      },
      commit: (callback /* : (err: ?Error) => void */) => {
        waterfall(
          [
            cb =>
              each(
                puts,
                async (p, cb) => {
                  await this.put(p.key, p.value);
                },
                cb,
              ),
            cb =>
              each(
                deletes,
                async (k, cb) => {
                  await this.delete(k);
                },
                cb,
              ),
          ],
          err => callback(err),
        );
      },
    };
  }

  query(q: Query<T>): QueryResult<T> {
    return undefined;
  }
}
