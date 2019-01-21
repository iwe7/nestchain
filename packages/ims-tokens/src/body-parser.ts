import { InjectionToken } from 'ims-core';
import {
  OptionsText,
  OptionsUrlencoded,
  OptionsJson,
  Options,
} from 'body-parser';
import { NextHandleFunction } from 'connect';

export interface BodyParser {
  (options?: OptionsJson & OptionsText & OptionsUrlencoded): NextHandleFunction;
  json(options?: OptionsJson): NextHandleFunction;
  raw(options?: Options): NextHandleFunction;
  text(options?: OptionsText): NextHandleFunction;
  urlencoded(options?: OptionsUrlencoded): NextHandleFunction;
}
export const BodyParser = new InjectionToken('BodyParser');
