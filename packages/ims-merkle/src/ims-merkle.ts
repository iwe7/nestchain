/**
 * 默克尔树
 */
export class ImsMerkle {}

import merkle = require('merkle');
const abcde = ['a', 'b', 'c', 'd', 'e'];
let sha256tree = merkle('sha256').sync(abcde);
let root = sha256tree.root();
debugger;
