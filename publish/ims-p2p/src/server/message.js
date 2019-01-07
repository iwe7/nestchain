"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_protocol_1 = require("ims-protocol");
let MessageRouter = class MessageRouter {
    onConnect(...args) {
        console.log(args);
    }
    onMessage() {
        console.log('message');
    }
    onListening() {
        console.log('listening');
    }
};
tslib_1.__decorate([
    ims_protocol_1.On({ type: 'connect' }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], MessageRouter.prototype, "onConnect", null);
tslib_1.__decorate([
    ims_protocol_1.On({ type: 'message' }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], MessageRouter.prototype, "onMessage", null);
tslib_1.__decorate([
    ims_protocol_1.On({ type: 'listening' }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], MessageRouter.prototype, "onListening", null);
MessageRouter = tslib_1.__decorate([
    ims_protocol_1.Router()
], MessageRouter);
exports.MessageRouter = MessageRouter;
