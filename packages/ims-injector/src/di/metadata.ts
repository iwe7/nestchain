import { makeDecorator, TypeDecorator } from 'ims-decorator';

export const InjectMetadataKey = 'InjectMetadataKey';
export interface InjectOptions {
  token: any;
}
export interface Inject {}
export interface InjectDecorator {
  (token?: any): TypeDecorator;
  new (token?: any): TypeDecorator;
  (token?: any): Inject;
  new (token?: any): Inject;
}
export const Inject: InjectDecorator = makeDecorator(
  InjectMetadataKey,
  'visitInject',
  token => ({ token }),
);

export interface Optional {}
export interface OptionalDecorator {
  (): TypeDecorator;
  new (): TypeDecorator;
  (): Optional;
  new (): Optional;
}
export const OptionalMetadataKey = 'OptionalMetadataKey';
export const Optional: OptionalDecorator = makeDecorator(
  OptionalMetadataKey,
  'visitOptional',
  dir => dir,
);

export interface Self {}
export interface SelfDecorator {
  (): TypeDecorator;
  new (): TypeDecorator;
  (): Self;
  new (): Self;
}
export const SelfMetadataKey = 'SelfMetadataKey';
export const Self: SelfDecorator = makeDecorator(
  SelfMetadataKey,
  'visitSelf',
  dir => dir,
);

export interface SkipSelf {}
export interface SkipSelfDecorator {
  (): TypeDecorator;
  new (): TypeDecorator;
  (): SkipSelf;
  new (): SkipSelf;
}
export const SkipSelfMetadataKey = 'SkipSelfMetadataKey';
export const SkipSelf: SkipSelfDecorator = makeDecorator(
  SkipSelfMetadataKey,
  'visitSkipSelf',
  dir => dir,
);

export const HostMetadataKey = 'HostMetadataKey';
export interface Host {}
export interface HostDecorator {
  (): TypeDecorator;
  new (): TypeDecorator;
  (): Host;
  new (): Host;
}
export const Host: HostDecorator = makeDecorator(
  HostMetadataKey,
  'visitHost',
  dir => dir,
);
