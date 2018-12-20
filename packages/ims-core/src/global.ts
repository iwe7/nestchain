import { isObject, isArray } from "ims-util";
declare var WorkerGlobalScope: any /** TODO #9100 */;
declare var global: any /** TODO #9100 */;
const __window = typeof window !== "undefined" && window;
const __self =
  typeof self !== "undefined" &&
  typeof WorkerGlobalScope !== "undefined" &&
  self instanceof WorkerGlobalScope &&
  self;
const __global = typeof global !== "undefined" && global;
const _global: { [name: string]: any } = __global || __window || __self;
const noop = function() {};
function _get() {
  return _global || noop;
}
export function getGlobal<T>(key?: any): T {
  if (key) {
    if (_get()[key]) {
      return _get()[key] as T;
    }
    return noop as any;
  }
  return _get() as T;
}
export function setGlobal(key: string, value: any) {
  if (isArray(value)) {
    _global[key] = value;
  } else if (isObject(value)) {
    _global[key] = _global[key] || {};
    _global[key] = { ..._global[key], ...value };
  } else {
    _global[key] = value;
  }
}
