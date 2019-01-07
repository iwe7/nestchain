import { TypeDecorator } from 'ims-decorator';
export declare const RouterMetadataKey = "RouterMetadataKey";
export interface RouterOptions {
    address: string;
}
export interface RouterDecorator {
    (opt?: RouterOptions): TypeDecorator;
}
export declare const Router: RouterDecorator;
