import { Type, ObjectLiteral } from 'ims-core';
import { Table } from 'ims-util';
export declare const metadataTable: Table<any>;
export declare enum MetadataType {
    class = 0,
    constructor = 1,
    parameter = 2,
    method = 3,
    property = 4
}
export interface ClassMetadata<D = any> {
    metadataKey: string;
    metadataType: MetadataType;
    metadataDef: D;
    parameters?: any[];
    metadataFactory: (...args: any[]) => any;
    primaryKey?: string;
    target?: Type<any>;
    visit: any;
}
export interface ConstructorMetadata<T = any> extends ClassMetadata<T> {
    parameterIndex: number;
    parameterType: any;
}
export interface PropertyMetadata<T = any> extends ClassMetadata<T> {
    propertyKey: string | symbol;
    propertyType: any;
}
export interface MethodMetadata<T = any> extends PropertyMetadata<T> {
    descriptor: TypedPropertyDescriptor<T>;
    returnType: any;
    parameters: any[];
    methodRuntime?: 'default' | 'after' | 'before';
}
export interface ParameterMetadata<T = any> extends PropertyMetadata<T> {
    parameterIndex: number;
    parameterType: any;
}
export declare type MetadataDef<T = any> = ClassMetadata<T> | ConstructorMetadata<T> | PropertyMetadata<T> | MethodMetadata<T> | ParameterMetadata<T>;
export declare function isClassMetadata<T = any>(def: MetadataDef): def is ClassMetadata<T>;
export declare function isConstructorMetadata<T = any>(def: MetadataDef): def is ConstructorMetadata<T>;
export declare function isPropertyMetadata<T = any>(def: MetadataDef): def is PropertyMetadata<T>;
export declare function isMethodMetadata<T = any>(def: MetadataDef): def is MethodMetadata<T>;
export declare function isParameterMetadata<T = any>(def: MetadataDef): def is ParameterMetadata<T>;
export declare function getMetadata<T>(target: Type<any>): Array<MetadataDef<T>>;
export declare function defineMetadata(def: MetadataDef): void;
export declare function searchMetadata(data: ObjectLiteral): Set<MetadataDef<any>>;
