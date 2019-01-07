"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const websockets_1 = require("@nestjs/websockets");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let EventsGateway = class EventsGateway {
    onEvent(client, data) {
        return rxjs_1.from([1, 2, 3]).pipe(operators_1.map(item => ({ event: 'events', data: item })));
    }
};
tslib_1.__decorate([
    websockets_1.WebSocketServer(),
    tslib_1.__metadata("design:type", Object)
], EventsGateway.prototype, "server", void 0);
tslib_1.__decorate([
    websockets_1.SubscribeMessage('events'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", rxjs_1.Observable)
], EventsGateway.prototype, "onEvent", null);
EventsGateway = tslib_1.__decorate([
    websockets_1.WebSocketGateway(8080)
], EventsGateway);
exports.EventsGateway = EventsGateway;
