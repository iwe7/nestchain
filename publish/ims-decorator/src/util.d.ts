import { MetadataDef } from './metadata';
import { Type } from 'ims-core';
import 'reflect-metadata';
export declare const getDesignParamTypes: (v: any, key?: string | symbol) => any;
export declare const getDesignReturnType: (v: any, key?: string | symbol) => any;
export declare const getDesignType: (v: any, key?: string | symbol) => any;
export declare const createMetadataType: (type: Type<any>, classMetadata: MetadataDef<any>[]) => any;
export declare function getPrototypeMetadata(meta: Array<MetadataDef<any>>, p: PropertyKey): MetadataDef<any>[];
export declare function createMetadataParams(metas: Array<MetadataDef<any>>, args: any[]): any[];
