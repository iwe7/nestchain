/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/*
 * This file exists to support compilation of @angular/core in Ivy mode.
 *
 * When the Angular compiler processes a compilation unit, it normally writes imports to
 * @angular/core. When compiling the core package itself this strategy isn't usable. Instead, the
 * compiler writes imports to this file.
 *
 * Only a subset of such imports are supported - core is not allowed to declare components or pipes.
 * A check in ngtsc's translator.ts validates this condition. The translator is responsible for
 * translating an external name (prefixed with ɵ) to the internal symbol name as exported below.
 *
 * The below symbols are used for @Injectable and @NgModule compilation.
 */

export {
  InjectableDef,
  InjectorDef,
  defineInjectable,
  defineInjector,
} from './di/defs';
export { inject } from './di/injector_compatibility';
export { NgModuleDef, NgModuleDefWithMeta } from './metadata/ng_module';
export { defineNgModule } from './render3/definition';
export { setClassMetadata } from './render3/metadata';
export { NgModuleFactory } from './render3/ng_module_ref';

/**
 * The existence of this constant (in this particular file) informs the Angular compiler that the
 * current program is actually @angular/core, which needs to be compiled specially.
 */
export const ITS_JUST_ANGULAR = true;
