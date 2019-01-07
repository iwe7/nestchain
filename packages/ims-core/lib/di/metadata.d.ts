export interface InjectDecorator {
    (token: any): any;
    new (token: any): Inject;
}
export interface Inject {
    token: any;
}
export declare const Inject: InjectDecorator;
export interface OptionalDecorator {
    (): any;
    new (): Optional;
}
export interface Optional {
}
export declare const Optional: OptionalDecorator;
export interface SelfDecorator {
    (): any;
    new (): Self;
}
export interface Self {
}
export declare const Self: SelfDecorator;
export interface SkipSelfDecorator {
    (): any;
    new (): SkipSelf;
}
export interface SkipSelf {
}
export declare const SkipSelf: SkipSelfDecorator;
export interface HostDecorator {
    (): any;
    new (): Host;
}
export interface Host {
}
export declare const Host: HostDecorator;
