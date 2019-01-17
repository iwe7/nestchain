import { TransformerFactory, Bundle, SourceFile } from 'typescript';
import { InjectionToken, Provider, Injector } from 'ims-core';

export abstract class CustomTransformers {
  /** Custom transformers to evaluate before built-in .js transformations. */
  abstract before?: TransformerFactory<SourceFile>[];
  /** Custom transformers to evaluate after built-in .js transformations. */
  abstract after?: TransformerFactory<SourceFile>[];
  /** Custom transformers to evaluate after built-in .d.ts transformations. */
  abstract afterDeclarations?: TransformerFactory<Bundle | SourceFile>[];
}
export const CustomTransformersToken = new InjectionToken<CustomTransformers>(
  'CustomTransformersToken',
);

export const AfterTransformerToken = new InjectionToken<
  TransformerFactory<SourceFile>[]
>('AfterTransformerToken');

export const BeforeTransformerToken = new InjectionToken<
  TransformerFactory<SourceFile>[]
>('BeforeTransformerToken');

export const AfterDeclarationsTransformerToken = new InjectionToken<
  TransformerFactory<SourceFile>[]
>('AfterDeclarationsTransformerToken');

export const tansformProviders: Provider[] = [
  {
    provide: CustomTransformersToken,
    useFactory: (injector: Injector) => {
      let custom: CustomTransformers = {};
      let after = injector.get(AfterTransformerToken, []);
      if (after && after.length > 0) {
        custom.after = after;
      }

      let before = injector.get(BeforeTransformerToken, []);
      if (before && before.length > 0) {
        custom.before = before;
      }

      let afterDeclarations = injector.get(
        AfterDeclarationsTransformerToken,
        [],
      );
      if (afterDeclarations && afterDeclarations.length > 0) {
        custom.afterDeclarations = afterDeclarations;
      }
      return custom;
    },
    deps: [Injector],
  },
];
