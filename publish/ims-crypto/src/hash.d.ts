/// <reference types="node" />
import crypto = require('crypto');
import stream = require('stream');
export declare class ImsCryptoHash {
    createString(algorithm: string, options?: stream.TransformOptions): (data: string | DataView | Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array | Buffer, encoding?: crypto.HexBase64Latin1Encoding) => string;
}
