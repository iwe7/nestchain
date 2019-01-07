"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PeerUpdateError extends Error {
    constructor(code, msg, description) {
        super(msg);
        this.code = code;
        this.description = description;
    }
    toString() {
        return JSON.stringify({
            code: this.code,
            message: this.message,
            description: this.description,
        });
    }
}
exports.PeerUpdateError = PeerUpdateError;
