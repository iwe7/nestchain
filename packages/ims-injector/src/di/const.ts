import { getClosureSafeProperty } from 'ims-util';
export const NG_INJECTABLE_DEF = getClosureSafeProperty({
  ngInjectableDef: getClosureSafeProperty,
});
export const NG_INJECTOR_DEF = getClosureSafeProperty({
  ngInjectorDef: getClosureSafeProperty,
});
