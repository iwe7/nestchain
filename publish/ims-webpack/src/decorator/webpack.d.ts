import { TypeDecorator } from 'ims-decorator';
export declare const WebpackMetadataKey = "WebpackMetadataKey";
import { Configuration } from 'webpack';
export interface WebpackOptions extends Configuration {
}
export interface WebpackDecoratory {
    (opt?: WebpackOptions): TypeDecorator;
}
export declare const Webpack: WebpackDecoratory;
