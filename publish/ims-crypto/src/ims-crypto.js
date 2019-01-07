"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("libp2p-crypto"), exports);
const hmac_1 = require("./hmac");
const aes_1 = require("./aes");
const keys_1 = require("./keys");
const hash_1 = require("./hash");
class ImsCrypto {
    constructor() {
        this.hmac = new hmac_1.ImsCryptoHmac();
        this.aes = new aes_1.ImsCryptoAes();
        this.keys = new keys_1.ImsCryptoKeys();
        this.hash = new hash_1.ImsCryptoHash();
    }
    createHash() { }
}
exports.ImsCrypto = ImsCrypto;
exports.default = new ImsCrypto();
