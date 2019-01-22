import { Type } from '../type';
import { LifeSubject } from '../util/index';
import { InjectionToken } from '../di/injection_token';
export declare enum MetadataType {
    class = 0,
    constructor = 1,
    parameter = 2,
    method = 3,
    property = 4
}
export interface BaseMetadata<D = any> {
    metadataType: MetadataType;
    metadataDef?: D;
    target: Type<any>;
    token: InjectionToken<MetadataFactory>;
}
export interface ClassMetadata<T = any> extends BaseMetadata<T> {
    parameters: ConstructorMetadata[];
    propertys: PropertyMetadata[];
    methods: MethodMetadata[];
}
export interface ConstructorMetadata<T = any> extends BaseMetadata<T> {
    parameterIndex: number;
    parameterType: any;
}
export interface PropertyMetadata<T = any> extends BaseMetadata<T> {
    propertyKey: PropertyKey;
    propertyType: any;
}
export interface MethodMetadata<T = any> extends BaseMetadata<T> {
    propertyKey: PropertyKey;
    returnType: any;
    parameters: ParameterMetadata[];
}
export interface ParameterMetadata<T = any> extends BaseMetadata<T> {
    propertyKey: PropertyKey;
    parameterIndex: number;
    parameterType: any;
}
export declare type MetadataDef<T = any> = ClassMetadata<T> | ConstructorMetadata<T> | PropertyMetadata<T> | MethodMetadata<T> | ParameterMetadata<T>;
export declare function isClassMetadata<T = any>(def: MetadataDef): def is ClassMetadata<T>;
export declare function isConstructorMetadata<T = any>(def: MetadataDef): def is ConstructorMetadata<T>;
export declare function isPropertyMetadata<T = any>(def: MetadataDef): def is PropertyMetadata<T>;
export declare function isMethodMetadata<T = any>(def: MetadataDef): def is MethodMetadata<T>;
export declare function isParameterMetadata<T = any>(def: MetadataDef): def is ParameterMetadata<T>;
export declare abstract class MetadataFactory {
    abstract type(life: LifeSubject, def: ClassMetadata): any;
}
export declare function getMethodDef(def: ClassMetadata, p: PropertyKey): MethodMetadata[];
export declare function getPropertyDef(def: ClassMetadata, p: PropertyKey): PropertyMetadata[];
export declare class MetadataFactoryDefault extends MetadataFactory {
    path: PropertyKey[];
    type(life: LifeSubject, def: ClassMetadata): any;
    create(value: any, def: ClassMetadata, life: LifeSubject): any;
    methodGet(old: Function, methodDef: MethodMetadata, def: ClassMetadata, life: LifeSubject): any;
    methodSet(old: Function, value: Function, methodDef: MethodMetadata, def: ClassMetadata, life: LifeSubject): Function;
    propertyGet(old: any, propertyDef: PropertyMetadata, def: ClassMetadata, life: LifeSubject): any;
    propertySet(old: any, value: any, propertyDef: PropertyMetadata, def: ClassMetadata, life: LifeSubject): any;
    parameter(value: any, def: ParameterMetadata, classDef: ClassMetadata): any;
    constructorParameter(value: any, def: ConstructorMetadata, classDef: ClassMetadata): any;
}
