"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
const injector_1 = require("./injector");
const proxy_1 = require("./proxy");
exports.Injectable = ims_decorator_1.makeDecorator('Injectable', 'visitInjectable', dir => dir, (type, meta) => {
    let options = meta.metadataDef;
    if (ims_decorator_1.isClassMetadata(meta)) {
        if (options.providedIn === 'root') {
            let { providedIn, ...opts } = options;
            if (opts.useValue ||
                opts.useClass ||
                opts.useFactory ||
                opts.useExisting ||
                opts.useClass) {
                injector_1.Injector.top.set([
                    {
                        provide: type,
                        deps: [],
                        ...opts,
                    },
                ]);
            }
            else {
                injector_1.Injector.top.set([
                    {
                        provide: type,
                        useClass: proxy_1.createProxyType(type),
                        deps: opts.deps || [],
                    },
                ]);
            }
        }
    }
});
