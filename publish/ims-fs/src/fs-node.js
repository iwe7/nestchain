"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const ims_crypto_1 = require("ims-crypto");
const ims_rxjs_1 = require("ims-rxjs");
const ims_level_1 = require("ims-level");
let level = new ims_level_1.ImsLevel('./db/fs');
class ImsFsLocalNode {
    constructor(_parent = null, _children = new Set()) {
        this._parent = _parent;
        this._children = _children;
        this.size = 0;
    }
    get parent() {
        return this._parent;
    }
    get children() {
        let arr = [];
        this._children.forEach(child => arr.push(child));
        return arr;
    }
    fromFolder(path) { }
    fromFile(path) {
        let readStream = fs.createReadStream(path);
        return ims_rxjs_1.fromCallback(opt => {
            let chunks = [];
            readStream.on('data', d => {
                chunks.push(d);
            });
            readStream.on('end', () => {
                chunks.forEach((chunk) => {
                    let node = new ImsFsLocalNode(this);
                    let createHash = ims_crypto_1.default.hash.createString('sha256');
                    node.hash = createHash(chunk);
                    node.chunk = chunk;
                    this._children.add(node);
                    this.size += node.chunk.byteLength;
                    level.put(node.hash, node.chunk, err => {
                        if (err)
                            return console.log(`put error ${node.hash}`, err);
                    });
                });
                opt.next(this);
                opt.complete();
            });
        }, opt => {
            readStream.removeAllListeners();
        });
    }
}
exports.ImsFsLocalNode = ImsFsLocalNode;
async function bootstrap() {
    let node = new ImsFsLocalNode();
    node = await node.fromFile(path.join(__dirname, '1.txt')).toPromise();
    let len = node.size;
    level.get(node.children[0].hash, (err, value) => {
        if (err)
            console.error(err);
        console.log(value);
    });
}
bootstrap();
