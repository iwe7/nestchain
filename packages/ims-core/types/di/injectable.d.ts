import { MetadataFactory, ClassMetadata } from '../decorator';
import { Type } from '../type';
import { ValueSansProvider, StaticClassSansProvider, ExistingSansProvider, ConstructorSansProvider, FactorySansProvider, ClassSansProvider } from './provider';
import { InjectionToken } from './injection_token';
import { LifeSubject } from '../util/index';
declare type InjectableProvider = ValueSansProvider | ExistingSansProvider | StaticClassSansProvider | ConstructorSansProvider | FactorySansProvider | ClassSansProvider;
export declare class InjectableFactory extends MetadataFactory {
    type(life: LifeSubject, def: ClassMetadata<InjectableOptions>): any;
}
export declare type InjectableOptions = {
    providedIn: Type<any> | 'root' | null;
} & InjectableProvider;
export declare const InjectableFactoryToken: InjectionToken<MetadataFactory>;
export declare const Injectable: import("../decorator/makeDecorator").IDecorator<InjectableOptions>;
export {};
