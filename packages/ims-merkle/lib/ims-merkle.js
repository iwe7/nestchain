"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ImsMerkle {
}
exports.ImsMerkle = ImsMerkle;
const merkle = require("merkle");
const abcde = ['a', 'b', 'c', 'd', 'e'];
let sha256tree = merkle('sha256').sync(abcde);
let root = sha256tree.root();
debugger;
