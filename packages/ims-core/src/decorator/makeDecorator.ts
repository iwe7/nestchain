import { isNumber, isUndefined, LifeSubject } from 'ims-util';
import { InjectionToken } from '../di/injection_token';

/**
 * 执行顺讯
 * [(property)...]->[(parameter->method)...]->constructor->class
 * [属性...]->[((方法参数...)->方法)...]->[constructor...]->class
 * 声明周期 property|parameter|method|constructor|class
 * 声明周期 [始化完毕]init->[属性添加]add->[属性删除]delete->[属性更新]update->[方法调用]call
 * [开始前]:start->[进行中]:runing->[结束]:end
 */
import {
  MetadataType,
  ConstructorMetadata,
  ParameterMetadata,
  ClassMetadata,
  PropertyMetadata,
  MethodMetadata,
  MetadataFactory,
  MetadataDef,
} from './type';
import {
  getDesignParamTypes,
  getDesignType,
  getDesignReturnType,
} from './util';
export interface IDecorator<T> extends Function {
  (o?: T): any;
  new (o?: T): any;
}
export function makeDecorator<T>(
  token: InjectionToken<MetadataFactory>,
  getDef?: (def: MetadataDef) => T,
  factory?: MetadataFactory,
): IDecorator<T> {
  let life: LifeSubject = new LifeSubject();
  let constructorParameter: ConstructorMetadata[] = [];
  let parameters: ParameterMetadata[] = [];
  let propertys: PropertyMetadata[] = [];
  let methods: MethodMetadata[] = [];
  let item: any = (metadataDef?: T) => {
    return <T>(
      target: any,
      propertyKey?: PropertyKey,
      descriptorOrParameterIndex?: TypedPropertyDescriptor<T> | number,
    ) => {
      let res: any;
      if (isNumber(descriptorOrParameterIndex)) {
        if (isUndefined(propertyKey)) {
          // constructor
          const types = getDesignParamTypes(target);
          let def: ConstructorMetadata = {
            metadataType: MetadataType.constructor,
            metadataDef,
            target,
            token,
            parameterIndex: descriptorOrParameterIndex,
            parameterType: types[descriptorOrParameterIndex],
          };
          def.metadataDef = !!getDef ? getDef(def) : metadataDef;
          // 收集constructor 装饰器
          constructorParameter.push(def);
        } else {
          // parameter
          const types = getDesignParamTypes(target, propertyKey);
          let def: ParameterMetadata = {
            metadataType: MetadataType.parameter,
            metadataDef,
            target,
            token,
            propertyKey,
            parameterIndex: descriptorOrParameterIndex,
            parameterType: types[descriptorOrParameterIndex],
          };
          def.metadataDef = !!getDef ? getDef(def) : metadataDef;
          // 收集方法参数装饰器
          parameters.push(def);
        }
      } else if (isUndefined(descriptorOrParameterIndex)) {
        if (isUndefined(propertyKey)) {
          // class
          let def: ClassMetadata = {
            metadataType: MetadataType.class,
            metadataDef,
            target,
            token,
            parameters: constructorParameter,
            propertys,
            methods,
          };
          def.metadataDef = !!getDef ? getDef(def) : metadataDef;
          res = factory && factory.type(life, def);
        } else {
          // property
          const propertyType = getDesignType(target, propertyKey);
          let def: PropertyMetadata = {
            metadataType: MetadataType.class,
            metadataDef,
            target,
            token,
            propertyKey,
            propertyType,
          };
          def.metadataDef = !!getDef ? getDef(def) : metadataDef;
          propertys.push(def);
        }
      } else {
        // method
        const returnType = getDesignReturnType(target, propertyKey);
        let def: MethodMetadata = {
          metadataType: MetadataType.method,
          metadataDef,
          target,
          token,
          parameters,
          propertyKey,
          returnType,
        };
        def.metadataDef = !!getDef ? getDef(def) : metadataDef;
        // 清空
        methods.push(def);
        parameters = [];
      }
      return res;
    };
  };
  return item;
}
