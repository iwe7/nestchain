"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isArray = Array.isArray || ((x) => x && typeof x.length === 'number');
