import { InjectionToken } from 'ims-core';
import { CompilerOptions } from 'typescript';
/**
 * compiler options token
 */
export const CompilerOptionsToken = new InjectionToken<CompilerOptions>(
  'CompilerOptions',
);
/**
 * ts config file token
 */
export const TsConfigFileToken = new InjectionToken<string>('TsConfigFile');
/**
 * root names token
 */
export const RootNamesToken = new InjectionToken<string[]>('rootNamesToken');
