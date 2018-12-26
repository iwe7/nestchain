import util = require('util');
import fs = require('fs');

export const exists = util.promisify(fs.exists);
export const readFile = util.promisify(fs.readFile);
