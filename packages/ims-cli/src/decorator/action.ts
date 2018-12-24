import { makeDecorator, TypeDecorator } from 'ims-decorator';
export const ActionMetadataKey = 'ActionMetadataKey';
export interface ActionOptions {}
export interface ActionDecorator {
  (opt?: ActionOptions): TypeDecorator;
}
export const Action: ActionDecorator = makeDecorator(
  ActionMetadataKey,
  'visitAction',
  dir => ({
    ...dir,
  }),
);
