/// <reference types="node" />
import fs = require('fs');
export declare class ImsFsLocalNode {
    private _parent;
    private _children;
    type: 'folder' | 'file';
    hash: string;
    chunk: Buffer;
    size: number;
    readonly parent: ImsFsLocalNode;
    readonly children: any[];
    constructor(_parent?: ImsFsLocalNode, _children?: Set<ImsFsLocalNode>);
    fromFolder(path: fs.PathLike): void;
    fromFile(path: fs.PathLike): import("../../ims-rxjs/src/fromCallback").FromCallbackObservable<any>;
}
