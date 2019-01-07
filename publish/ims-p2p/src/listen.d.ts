/// <reference types="node" />
import { ListenOptions } from 'net';
import { TypeDecorator } from 'ims-decorator';
export { ListenOptions };
export interface ListenDecorator {
    (opt: ListenOptions): TypeDecorator;
}
export declare const ListenMetadataKey = "ListenMetadataKey";
export declare const Listen: ListenDecorator;
