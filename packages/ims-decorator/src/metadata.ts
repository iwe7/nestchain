import { Type, ObjectLiteral } from 'ims-core';
import { keys, Table } from 'ims-util';

export const metadataTable = new Table(
  'metadata-table',
  {
    columns: [
      'metadataKey',
      'metadataType',
      'metadataDef',
      'parameters',
      'primaryKey',
      'target',
      'parameterIndex',
      'parameterType',
      'propertyKey',
      'propertyType',
      'descriptor',
      'returnType',
      'parameters',
      'methodRuntime',
      'visit'
    ],
    indices: [
      'target',
      'metadataKey',
      'metadataType',
      'propertyKey',
      'parameterIndex',
      'primaryKey',
    ],
    uniques: ['target.name-primaryKey'],
    orderBy: 'metadataType asc',
  },
  false,
);

export enum MetadataType {
  class,
  constructor,
  parameter,
  method,
  property,
}

export interface ClassMetadata<D = any> {
  metadataKey: string;
  metadataType: MetadataType;
  metadataDef: D;
  parameters?: any[];
  metadataFactory: any;
  primaryKey?: string;
  target?: Type<any>;
  visit: string;
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

export type MetadataDef<T = any> =
  | ClassMetadata<T>
  | ConstructorMetadata<T>
  | PropertyMetadata<T>
  | MethodMetadata<T>
  | ParameterMetadata<T>;

export function isClassMetadata<T = any>(
  def: MetadataDef,
): def is ClassMetadata<T> {
  return def.metadataType === MetadataType.class;
}
export function isConstructorMetadata<T = any>(
  def: MetadataDef,
): def is ConstructorMetadata<T> {
  return def.metadataType === MetadataType.constructor;
}
export function isPropertyMetadata<T = any>(
  def: MetadataDef,
): def is PropertyMetadata<T> {
  return def.metadataType === MetadataType.property;
}
export function isMethodMetadata<T = any>(
  def: MetadataDef,
): def is MethodMetadata<T> {
  return def.metadataType === MetadataType.method;
}
export function isParameterMetadata<T = any>(
  def: MetadataDef,
): def is ParameterMetadata<T> {
  return def.metadataType === MetadataType.parameter;
}
export function getMetadata<T>(target: Type<any>): Array<MetadataDef<T>> {
  let res: any[] = [];
  metadataTable.data.forEach((data: any, k) => {
    if (data.target === target) {
      data['__id__'] = k;
      res.push(data);
    }
  });
  return res;
}
export function defineMetadata(def: MetadataDef) {
  metadataTable.insert(def);
}
export function searchMetadata(data: ObjectLiteral) {
  let where = keys(data).map(key => ({ key, value: data[key] }));
  let res: MetadataDef[] = metadataTable.search((a, b) => {
    return where.every(v => {
      return v.key === a && v.value === b;
    });
  }).result;
  return new Set(res);
}
