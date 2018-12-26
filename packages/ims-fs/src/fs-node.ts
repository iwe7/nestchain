import fs = require('fs');
import path = require('path');
import crypto from 'ims-crypto';
import { fromCallback } from 'ims-rxjs';
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
  constructor(
    private _parent: ImsFsLocalNode = null,
    private children: Set<ImsFsLocalNode> = new Set(),
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
          chunks.forEach(chunk => {
            let node = new ImsFsLocalNode(this);
            let createHash = crypto.hash.createString('sha256');
            node.hash = createHash(chunk);
            node.chunk = chunk;
            this.children.add(node);
            // 64kb
            this.size += node.chunk.byteLength;
            opt.next(this);
            opt.complete();
          });
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
  debugger;
}

bootstrap();
