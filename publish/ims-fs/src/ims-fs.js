"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util = require("util");
const fs = require("fs");
exports.exists = util.promisify(fs.exists);
exports.readFile = util.promisify(fs.readFile);
