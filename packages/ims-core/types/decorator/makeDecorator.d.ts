import { InjectionToken } from '../di/injection_token';
import { MetadataFactory, MetadataDef } from './type';
export interface IDecorator<T> extends Function {
    (o?: T): any;
    new (o?: T): any;
}
export declare function makeDecorator<T>(token: InjectionToken<MetadataFactory>, getDef?: (def: MetadataDef) => T, factory?: MetadataFactory): IDecorator<T>;
