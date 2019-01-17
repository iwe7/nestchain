import { InjectionToken, Provider } from 'ims-core';
import { Visitor } from 'typescript';
export const VisitorToken = new InjectionToken<Visitor>('VisitorToken');
export const visitorProviders: Provider[] = [
  {
    provide: VisitorToken,
    useFactory: () => {
      let visitor: Visitor = node => {
        return node;
      };
      return visitor;
    },
    deps: [],
  },
];
