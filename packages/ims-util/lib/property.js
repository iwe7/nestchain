"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getClosureSafeProperty(objWithPropertyToExtract) {
    for (let key in objWithPropertyToExtract) {
        if (objWithPropertyToExtract[key] === getClosureSafeProperty) {
            return key;
        }
    }
    throw Error('Could not find renamed property on target object.');
}
exports.getClosureSafeProperty = getClosureSafeProperty;
