/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
  NgModuleFactory as R3NgModuleFactory,
  NgModuleType,
} from '../render3/ng_module_ref';
import { Type } from '../type';
import { stringify } from '../util';
import { NgModuleFactory } from './ng_module_factory';

/**
 * Used to load ng module factories.
 *
 * @publicApi
 */
export abstract class NgModuleFactoryLoader {
  abstract load(path: string): Promise<NgModuleFactory<any>>;
}

/**
 * Map of module-id to the corresponding NgModule.
 * - In pre Ivy we track NgModuleFactory,
 * - In post Ivy we track the NgModuleType
 */
const modules = new Map<string, NgModuleFactory<any> | NgModuleType>();

/**
 * Registers a loaded module. Should only be called from generated NgModuleFactory code.
 * @publicApi
 */
export function registerModuleFactory(
  id: string,
  factory: NgModuleFactory<any>,
) {
  const existing = modules.get(id) as NgModuleFactory<any>;
  assertNotExisting(id, existing && existing.moduleType);
  modules.set(id, factory);
}

function assertNotExisting(id: string, type: Type<any> | null): void {
  if (type) {
    throw new Error(
      `Duplicate module registered for ${id} - ${stringify(
        type,
      )} vs ${stringify(type.name)}`,
    );
  }
}

export function registerNgModuleType(id: string, ngModuleType: NgModuleType) {
  const existing = modules.get(id) as NgModuleType | null;
  assertNotExisting(id, existing);
  modules.set(id, ngModuleType);
}

export function clearModulesForTest(): void {
  modules.clear();
}

export function getModuleFactory__PRE_R3__(id: string): NgModuleFactory<any> {
  const factory = modules.get(id) as NgModuleFactory<any> | null;
  if (!factory) throw noModuleError(id);
  return factory;
}

export function getModuleFactory__POST_R3__(id: string): NgModuleFactory<any> {
  const type = modules.get(id) as NgModuleType | null;
  if (!type) throw noModuleError(id);
  return new R3NgModuleFactory(type);
}

/**
 * Returns the NgModuleFactory with the given id, if it exists and has been loaded.
 * Factories for modules that do not specify an `id` cannot be retrieved. Throws if the module
 * cannot be found.
 * @publicApi
 */
export const getModuleFactory: (
  id: string,
) => NgModuleFactory<any> = getModuleFactory__PRE_R3__;

function noModuleError(id: string): Error {
  return new Error(`No module with ID ${id} loaded`);
}
