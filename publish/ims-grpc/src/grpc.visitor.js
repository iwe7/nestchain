"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
const grpc_1 = require("grpc");
const proto_loader_1 = require("@grpc/proto-loader");
const ims_util_1 = require("ims-util");
class GrpcVisitor extends ims_decorator_1.Visitor {
    visitGrpcServer(it, parent, context, opts = {}) {
        let options = { ...it.metadataDef, ...opts };
        let that = this;
        if (ims_decorator_1.isClassMetadata(it)) {
            it.metadataFactory = function (Target) {
                return class extends Target {
                    constructor(...args) {
                        super(...args);
                        this.package = {};
                        this.config = {};
                        this.server = new grpc_1.Server();
                        this.package = grpc_1.loadPackageDefinition(proto_loader_1.loadSync(options.fileName, options.options));
                        Object.keys(options.router).forEach(key => {
                            let it = options.router[key];
                            that.visitType(it, this.config, key);
                        });
                        Object.keys(this.package).forEach(key => {
                            let cfg = this.config;
                            let pkg = this.package[key];
                            Object.keys(pkg).forEach(it => {
                                this.server.addService(pkg[it].service, cfg[it]);
                            });
                        });
                        this.server.bind(options.address, grpc_1.ServerCredentials.createInsecure());
                        this.server.start();
                    }
                };
            };
        }
        if (ims_decorator_1.isPropertyMetadata(it)) {
        }
        if (ims_decorator_1.isMethodMetadata(it)) {
        }
        return it;
    }
    visitGrpcClient(it, parent, context, opts = {}) {
        let options = { ...it.metadataDef, ...opts };
        let that = this;
        if (ims_decorator_1.isClassMetadata(it)) {
            it.metadataFactory = function (type) {
                return class extends type {
                    constructor(...args) {
                        super(...args);
                        this.package = {};
                        this.package = grpc_1.loadPackageDefinition(proto_loader_1.loadSync(options.fileName, options.options));
                        that.visitTypeOther(type, parent, this);
                    }
                    get(name) {
                        try {
                            let [pkg, cls] = name.split('.');
                            let method = this.package[pkg][cls];
                            return new method(options.address, grpc_1.credentials.createInsecure());
                        }
                        catch (e) {
                            throw new Error(`找不到${name}`);
                        }
                    }
                    set(key, val) {
                        Object.defineProperty(this, key, {
                            get: () => val,
                        });
                    }
                };
            };
        }
        if (ims_decorator_1.isPropertyMetadata(it)) {
            let prototype = context.get(`${options.path}`);
            context.set(it.propertyKey, prototype);
        }
        return it;
    }
    visitGrpcRouter(it, parent, context, opts = {}) {
        let options = { ...it.metadataDef, ...opts };
        let that = this;
        if (ims_decorator_1.isClassMetadata(it)) {
            it.metadataFactory = function (type) {
                return class extends type {
                    constructor(...args) {
                        super(...args);
                        this.topPath = options.path;
                        that.visitTypeOther(type, parent, this);
                    }
                };
            };
        }
        if (ims_decorator_1.isMethodMetadata(it)) {
            if (!!context.topPath) {
                parent[context.topPath] = parent[context.topPath] || {};
                parent[context.topPath][ims_util_1.toLTitleCase(options.path)] = context[it.propertyKey].bind(context);
            }
            else {
                const [topPath, path] = options.path.split('.');
                if (!!path) {
                    parent[topPath] = parent[topPath] || {};
                    parent[topPath][ims_util_1.toLTitleCase(path)] = context[it.propertyKey].bind(context);
                }
            }
            return it;
        }
        return it;
    }
}
exports.GrpcVisitor = GrpcVisitor;
