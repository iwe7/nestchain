"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isArrayLike = ((x) => x && typeof x.length === 'number' && typeof x !== 'function');
