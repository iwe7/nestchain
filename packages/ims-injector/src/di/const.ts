import { getClosureSafeProperty } from 'ims-util';
import { ValueProvider } from './provider';

export const USE_VALUE = getClosureSafeProperty<ValueProvider>({
  provide: String,
  useValue: getClosureSafeProperty,
});
