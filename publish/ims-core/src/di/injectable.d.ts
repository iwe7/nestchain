import { TypeDecorator } from 'ims-decorator';
import { Type } from '../type';
import { ValueSansProvider, StaticClassSansProvider, ExistingSansProvider, ConstructorSansProvider, FactorySansProvider, ClassSansProvider } from './provider';
export declare type InjectableProvider = ValueSansProvider | ExistingSansProvider | StaticClassSansProvider | ConstructorSansProvider | FactorySansProvider | ClassSansProvider;
export interface InjectableDecorator {
    (): TypeDecorator;
    (options?: {
        providedIn: Type<any> | 'root' | null;
    } & InjectableProvider): TypeDecorator;
    new (): Injectable;
    new (options?: {
        providedIn: Type<any> | 'root' | null;
    } & InjectableProvider): Injectable;
}
export interface Injectable {
    providedIn?: Type<any> | 'root' | null;
}
export declare const Injectable: InjectableDecorator;
