import fs = require('fs');
import path = require('path');
import crypto from 'ims-crypto';
import { fromCallback } from 'ims-rxjs';
import { ImsLevel } from 'ims-level';
let level = new ImsLevel('./db/fs');

export class ImsFsLocalNode {
  // 文件夹 or 文件
  type: 'folder' | 'file';
  // 校验码
  hash: string;
  // 内容
  chunk: Buffer;
  // 大小
  size: number = 0;
  // 父节点

  get parent() {
    return this._parent;
  }
  get children() {
    let arr = [];
    this._children.forEach(child => arr.push(child));
    return arr;
  }
  constructor(
    private _parent: ImsFsLocalNode = null,
    private _children: Set<ImsFsLocalNode> = new Set(),
  ) {}

  fromFolder(path: fs.PathLike) {}

  fromFile(path: fs.PathLike) {
    let readStream = fs.createReadStream(path);
    return fromCallback<any>(
      opt => {
        let chunks = [];
        readStream.on('data', d => {
          chunks.push(d);
        });
        readStream.on('end', () => {
          chunks.forEach((chunk: Buffer) => {
            let node = new ImsFsLocalNode(this);
            let createHash = crypto.hash.createString('sha256');
            node.hash = createHash(chunk);
            node.chunk = chunk;
            this._children.add(node);
            // 64kb
            this.size += node.chunk.byteLength;
            level.put(node.hash, node.chunk, err => {
              if (err) return console.log(`put error ${node.hash}`, err);
            });
          });
          opt.next(this);
          opt.complete();
        });
      },
      opt => {
        readStream.removeAllListeners();
      },
    );
  }
}

async function bootstrap() {
  let node = new ImsFsLocalNode();
  node = await node.fromFile(path.join(__dirname, '1.txt')).toPromise();
  let len = node.size;
  level.get(node.children[0].hash, (err, value) => {
    if (err) console.error(err);
    console.log(value);
  });
}

bootstrap();
