import { TypeDecorator } from 'ims-decorator';
import { IInjector } from 'ims-core';
export declare const AddonMetadataKey = "AddonMetadataKey";
export interface AddonOptions {
    entity: IInjector;
    title: string;
    version: string;
    proto: string;
}
export interface AddonDecorator {
    (opt: AddonOptions): TypeDecorator;
}
export declare const Addon: AddonDecorator;
