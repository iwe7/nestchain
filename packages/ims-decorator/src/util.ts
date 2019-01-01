import {
  MetadataDef,
  isClassMetadata,
  isParameterMetadata,
  ConstructorMetadata,
  isPropertyMetadata,
  isMethodMetadata,
} from './metadata';
import { compose } from 'ims-util';
import { Type } from 'ims-core';

const _getMetadata = (type: string) => (v: any, key?: string | symbol) => {
  return Reflect.getMetadata(type, v, key);
};
export const getDesignParamTypes = _getMetadata('design:paramtypes');
export const getDesignReturnType = _getMetadata('design:returntype');
export const getDesignType = _getMetadata('design:type');

export const createMetadataType = (
  type: Type<any>,
  classMetadata: Array<MetadataDef<any>>,
) => {
  let classFactory = classMetadata.map(it => it.metadataFactory);
  let Target = compose(...classFactory)(type);
  return Target;
};

export function getPrototypeMetadata(
  meta: Array<MetadataDef<any>>,
  p: PropertyKey,
) {
  return meta.filter(it => {
    if (isPropertyMetadata(it) || isMethodMetadata(it)) {
      return it.propertyKey === p;
    }
    return false;
  });
}

export function createMetadataParams(
  metas: Array<MetadataDef<any>>,
  args: any[],
) {
  const item: { [key: number]: any[] } = {};
  metas.map(it => {
    if (isParameterMetadata(it)) {
      item[it.parameterIndex] = item[it.parameterIndex] || [];
      item[it.parameterIndex].push(it.metadataFactory);
    }
  });
  Object.keys(item).map(index => {
    args[index] = compose(...item[index])(args[index]);
  });
  return args;
}
