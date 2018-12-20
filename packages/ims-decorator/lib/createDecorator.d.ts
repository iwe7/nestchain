import { Type } from 'ims-core';
import { MetadataDef } from './metadata';
export declare function createDecorator<T = any>(type: Type<any>): Type<T>;
export declare function getDecorator<T = any>(type: Type<T>): Type<T>;
export declare function getStaticProperty(target: Type<any>, type: string): any;
export declare function createDecoratorProperty(type: any, key: any, metadata: Array<MetadataDef<any>>): void;
export declare function createDecoratorMethod(type: any, key: any, metadata: Array<MetadataDef<any>>, target: Type<any>): void;
export declare function createDecoratorConstructor(args: any[]): (type: Type<any>) => any[];
