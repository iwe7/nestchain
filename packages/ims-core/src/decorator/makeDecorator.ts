import { InjectionToken } from '../di/injection_token';
import { LifeSubject, isNumber, isUndefined } from '../util/index';
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
const MakeDecoratorCache: Map<
  any,
  {
    constructorParameter: any[];
    parameters: any[];
    propertys: any[];
    methods: any[];
  }
> = new Map();

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
  // 设置解析器
  let item: any = (metadataDef?: T) => {
    return <T>(
      target: any,
      propertyKey?: PropertyKey,
      descriptorOrParameterIndex?: TypedPropertyDescriptor<T> | number,
    ) => {
      let res: any;

      if (isNumber(descriptorOrParameterIndex)) {
        if (isUndefined(propertyKey)) {
          if (!MakeDecoratorCache.has(target)) {
            MakeDecoratorCache.set(target, {
              constructorParameter,
              parameters,
              propertys,
              methods,
            });
          }
          debugger;
          // constructor
          let config = MakeDecoratorCache.get(target);
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
          config.constructorParameter.push(def);
          MakeDecoratorCache.set(target, config);
        } else {
          // parameter
          target = target.constructor;
          if (!MakeDecoratorCache.has(target)) {
            MakeDecoratorCache.set(target, {
              constructorParameter,
              parameters,
              propertys,
              methods,
            });
          }
          let config = MakeDecoratorCache.get(target);
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
          config.parameters.push(def);
          MakeDecoratorCache.set(target, config);
        }
      } else if (isUndefined(descriptorOrParameterIndex)) {
        if (isUndefined(propertyKey)) {
          // class
          if (!MakeDecoratorCache.has(target)) {
            MakeDecoratorCache.set(target, {
              constructorParameter,
              parameters,
              propertys,
              methods,
            });
          }
          let config = MakeDecoratorCache.get(target);
          let def: ClassMetadata = {
            metadataType: MetadataType.class,
            metadataDef,
            target,
            token,
            parameters: config.constructorParameter,
            propertys: config.propertys,
            methods: config.methods,
          };
          def.metadataDef = !!getDef ? getDef(def) : metadataDef;
          res = factory && factory.type(life, def);
        } else {
          // property
          target = target.constructor;
          if (!MakeDecoratorCache.has(target)) {
            MakeDecoratorCache.set(target, {
              constructorParameter,
              parameters,
              propertys,
              methods,
            });
          }
          let config = MakeDecoratorCache.get(target);
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
          config.propertys.push(def);
          MakeDecoratorCache.set(target, config);
        }
      } else {
        // method
        target = target.constructor;
        if (!MakeDecoratorCache.has(target)) {
          MakeDecoratorCache.set(target, {
            constructorParameter,
            parameters,
            propertys,
            methods,
          });
        }
        const returnType = getDesignReturnType(target, propertyKey);
        let config = MakeDecoratorCache.get(target);
        let def: MethodMetadata = {
          metadataType: MetadataType.method,
          metadataDef,
          target,
          token,
          parameters: config.parameters,
          propertyKey,
          returnType,
        };
        def.metadataDef = !!getDef ? getDef(def) : metadataDef;
        // 清空
        config.methods.push(def);
        config.parameters = [];
        MakeDecoratorCache.set(target, config);
      }
      return res;
    };
  };
  return item;
}
