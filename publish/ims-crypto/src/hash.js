"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
class ImsCryptoHash {
    createString(algorithm, options) {
        let hash = crypto.createHash(algorithm, options);
        return (data, encoding = 'hex') => hash.update(data).digest(encoding);
    }
}
exports.ImsCryptoHash = ImsCryptoHash;
