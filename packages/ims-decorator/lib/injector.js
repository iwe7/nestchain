"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_1 = require("./metadata");
const createDecorator_1 = require("./createDecorator");
const ims_util_1 = require("ims-util");
function injector(visitor) {
    return (type, ...args) => {
        let meta = metadata_1.getMetadata(type);
        meta = meta
            .filter(it => metadata_1.isClassMetadata(it))
            .map(it => {
            return visitor && visitor.visit(it, null, type);
        });
        let Target = type;
        const factorys = meta
            .filter(it => {
            return !!it && metadata_1.isClassMetadata(it);
        })
            .filter(it => !ims_util_1.isNullOrUndefined(it.metadataFactory))
            .map(it => it.metadataFactory);
        if (factorys.length > 0) {
            const fn = ims_util_1.compose(...factorys);
            Target = fn(Target);
        }
        args = createDecorator_1.createDecoratorConstructor(args)(type);
        return new Target(...args);
    };
}
exports.injector = injector;
