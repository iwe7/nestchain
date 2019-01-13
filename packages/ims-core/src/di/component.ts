import { makeDecorator, TypeDecorator } from 'ims-decorator';

export interface Component {}
export interface ComponentOptions {}
export interface ComponentDecorator {
  (opt: ComponentOptions): TypeDecorator;
  new (opt: ComponentOptions): Component;
}

export const Component: ComponentDecorator = makeDecorator(
  'Component',
  'visitComponent',
  dir => dir,
);
