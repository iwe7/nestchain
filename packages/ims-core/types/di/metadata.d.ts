import { MetadataFactory } from '../decorator/index';
import { InjectionToken } from './injection_token';
export interface Inject {
    token: any;
}
export declare const InjectToken: InjectionToken<MetadataFactory>;
export declare const Inject: import("../decorator/makeDecorator").IDecorator<any>;
export declare const OptionalToken: InjectionToken<MetadataFactory>;
export declare const Optional: import("../decorator/makeDecorator").IDecorator<{}>;
export declare const SelfToken: InjectionToken<MetadataFactory>;
export declare const Self: import("../decorator/makeDecorator").IDecorator<{}>;
export declare const SkipSelfToken: InjectionToken<MetadataFactory>;
export declare const SkipSelf: import("../decorator/makeDecorator").IDecorator<{}>;
export declare const HostToken: InjectionToken<MetadataFactory>;
export declare const Host: import("../decorator/makeDecorator").IDecorator<{}>;
