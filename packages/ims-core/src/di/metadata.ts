import { makeDecorator } from 'ims-decorator';

export interface InjectDecorator {
  (token: any): any;
  new (token: any): Inject;
}

export interface Inject {
  token: any;
}

export const Inject: InjectDecorator = makeDecorator(
  'Inject',
  'visitInject',
  (token: any) => ({ token }),
);

export interface OptionalDecorator {
  (): any;
  new (): Optional;
}

export interface Optional {}

export const Optional: OptionalDecorator = makeDecorator(
  'Optional',
  'visitOptional',
);

export interface SelfDecorator {
  (): any;
  new (): Self;
}

export interface Self {}
export const Self: SelfDecorator = makeDecorator('Self', 'visitSelf');

export interface SkipSelfDecorator {
  (): any;
  new (): SkipSelf;
}

export interface SkipSelf {}

export const SkipSelf: SkipSelfDecorator = makeDecorator(
  'SkipSelf',
  'visitSkipSelf',
);

export interface HostDecorator {
  (): any;
  new (): Host;
}

export interface Host {}
export const Host: HostDecorator = makeDecorator('Host', 'visitHost');
