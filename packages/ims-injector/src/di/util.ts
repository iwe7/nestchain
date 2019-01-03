import { Type } from 'ims-core';
import {
  ValueSansProvider,
  ExistingSansProvider,
  StaticClassSansProvider,
  ConstructorSansProvider,
  FactorySansProvider,
  ClassSansProvider,
  ValueProvider,
} from './provider';
import { injectArgs, inject } from './injector_compatibility';
import {
  getMetadata,
  isConstructorMetadata,
  isClassMetadata,
} from 'ims-decorator';
import { getClosureSafeProperty } from 'ims-util';
const USE_VALUE = getClosureSafeProperty<ValueProvider>({
  provide: String,
  useValue: getClosureSafeProperty,
});
const EMPTY_ARRAY: any[] = [];

export function convertInjectableProviderToFactory(
  type: Type<any>,
  provider?:
    | ValueSansProvider
    | ExistingSansProvider
    | StaticClassSansProvider
    | ConstructorSansProvider
    | FactorySansProvider
    | ClassSansProvider,
): () => any {
  debugger;
  if (!provider) {
    let deps = getConstructorParamters(type);
    return () => new type(...injectArgs(deps as any[]));
  }
  if (USE_VALUE in provider) {
    const valueProvider = provider as ValueSansProvider;
    return () => valueProvider.useValue;
  } else if ((provider as ExistingSansProvider).useExisting) {
    const existingProvider = provider as ExistingSansProvider;
    return () => inject(existingProvider.useExisting);
  } else if ((provider as FactorySansProvider).useFactory) {
    const factoryProvider = provider as FactorySansProvider;
    return () =>
      factoryProvider.useFactory(
        ...injectArgs(factoryProvider.deps || EMPTY_ARRAY),
      );
  } else if (
    (provider as StaticClassSansProvider | ClassSansProvider).useClass
  ) {
    const classProvider = provider as
      | StaticClassSansProvider
      | ClassSansProvider;
    let deps = (provider as StaticClassSansProvider).deps;
    if (!deps) {
      deps = getConstructorParamters(type);
    }
    return () => new classProvider.useClass(...injectArgs(deps));
  } else {
    let deps = (provider as ConstructorSansProvider).deps;
    if (!deps) {
      deps = getConstructorParamters(type);
    }
    return () => new type(...injectArgs(deps!));
  }
}

function getConstructorParamters(type: Type<any>) {
  let meta = getMetadata(type);
  // todo
  let constructors = meta.filter(it => isConstructorMetadata(it));
  let classMeta = meta.find(it => isClassMetadata(it));
  let deps = classMeta.parameters;
  return deps;
}
