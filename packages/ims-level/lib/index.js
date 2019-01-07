"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const levelup_1 = require("levelup");
const path = require("path");
const leveldown_1 = require("leveldown");
const encode = require("encoding-down");
const ims_const_1 = require("ims-const");
class Level extends levelup_1.default {
    constructor(options = {}, callback) {
        super(encode(Level.db, options), options, callback);
    }
    static destroy(location, cb) {
        this.db.destory(location, cb || function () { });
    }
    static repair(location, cb) {
        this.db.repair(location, cb || function () { });
    }
}
Level.errors = levelup_1.default.errors;
exports.Level = Level;
Level.db = leveldown_1.default(path.join(ims_const_1.ROOT, 'www/data/coredb'));
exports.default = Level;
