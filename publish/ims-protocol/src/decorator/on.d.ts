import { TypeDecorator } from 'ims-decorator';
export declare const OnMetadataKey = "OnMetadataKey";
export interface OnOptions {
    type: string;
}
export interface OnDecorator {
    (opt?: OnOptions): TypeDecorator;
}
export declare const On: OnDecorator;
