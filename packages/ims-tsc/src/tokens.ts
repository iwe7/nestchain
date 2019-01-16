import { InjectionToken } from 'ims-core';
import { CompilerOptions, TransformerFactory } from 'typescript';
/**
 * Compiler Options Token
 */
export const CompilerOptionsToken = new InjectionToken<CompilerOptions>(
  'CompilerOptions',
);

/**
 * tranformer factorys
 */
export const TransformerFactoryToken = new InjectionToken<
  TransformerFactory<any>[]
>('TransformerFactoryToken');

export const TsConfigFileToken = new InjectionToken<string>('TsConfigFile');


export const RootNamesToken = new InjectionToken<string[]>('rootNamesToken');
