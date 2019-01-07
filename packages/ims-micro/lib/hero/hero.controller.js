"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
const grpc_client_options_1 = require("../grpc-client.options");
let HeroController = class HeroController {
    onModuleInit() {
        this.heroService = this.client.getService('HeroService');
    }
    call() {
        return this.heroService.findOne({ id: 1 });
    }
    findOne(data) {
        const items = [{ id: 1, name: 'John' }, { id: 2, name: 'Doe' }];
        return items.find(({ id }) => id === data.id);
    }
};
tslib_1.__decorate([
    microservices_1.Client(grpc_client_options_1.grpcClientOptions),
    tslib_1.__metadata("design:type", Object)
], HeroController.prototype, "client", void 0);
tslib_1.__decorate([
    common_1.Get(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", rxjs_1.Observable)
], HeroController.prototype, "call", null);
tslib_1.__decorate([
    microservices_1.GrpcMethod('HeroService'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Object)
], HeroController.prototype, "findOne", null);
HeroController = tslib_1.__decorate([
    common_1.Controller()
], HeroController);
exports.HeroController = HeroController;
