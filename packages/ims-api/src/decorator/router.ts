import {
  makeDecorator,
  InjectionToken,
  MetadataFactory,
  LifeSubject,
  ClassMetadata,
  Injector,
  MethodMetadata,
} from 'ims-core';
export const RouterToken = new InjectionToken<MetadataFactory>('RouterToken');
export interface Router {
  path?: string;
  method?: 'get' | 'post';
}
import { AppRoutes } from '../tokens';
import { GetToken, Get } from './get';
import { PostToken, Post } from './post';
export class RouterMetadataFactory implements MetadataFactory {
  type(life: LifeSubject, def: ClassMetadata<Router>): any {
    let options = def.metadataDef;
    let base = options.path || def.target.name;
    def.methods.forEach((it: MethodMetadata<Get> | MethodMetadata<Post>) => {
      let opt = it.metadataDef;
      if (it.token === GetToken) {
        Injector.top.set({
          provide: AppRoutes,
          multi: true,
          useValue: {
            path: `${base}/${opt.path || (it.propertyKey as string)}`,
            method: 'get',
            action: async (injector: Injector) => {
              let instance = await injector.get(def.target);
              return {
                instance,
                propertyKey: it.propertyKey,
              };
            },
          },
        });
      } else if (it.token === PostToken) {
        Injector.top.set({
          provide: AppRoutes,
          multi: true,
          useValue: {
            path: `${base}/${opt.path || (it.propertyKey as string)}`,
            method: 'post',
            action: async (injector: Injector) => {
              let instance = await injector.get(def.target);
              return {
                instance,
                propertyKey: it.propertyKey,
              };
            },
          },
        });
      }
    });
    return def.target;
  }
}
export const Router = makeDecorator<Router>(
  RouterToken,
  def => def.metadataDef,
  new RouterMetadataFactory(),
);
