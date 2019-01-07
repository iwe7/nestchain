import { TypeDecorator } from 'ims-decorator';
export declare const SendMetadataKey = "SendMetadataKey";
export interface SendOptions {
    type: string;
}
export interface SendDecorator {
    (opt?: SendOptions): TypeDecorator;
}
export declare const Send: SendDecorator;
