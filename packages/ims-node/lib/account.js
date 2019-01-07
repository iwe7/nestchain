"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ImsAccount {
    constructor(accountId) {
        this.accountId = accountId;
    }
    static create(accountId) { }
}
exports.ImsAccount = ImsAccount;
class ImsBase {
}
exports.ImsBase = ImsBase;
class ImsModule extends ImsBase {
}
exports.ImsModule = ImsModule;
class ImsModuleCron extends ImsBase {
}
exports.ImsModuleCron = ImsModuleCron;
class ImsModuleHook extends ImsBase {
}
exports.ImsModuleHook = ImsModuleHook;
class ImsModuleMobile extends ImsBase {
}
exports.ImsModuleMobile = ImsModuleMobile;
class ImsModulePhoneapp extends ImsBase {
}
exports.ImsModulePhoneapp = ImsModulePhoneapp;
class ImsModuleProcessor extends ImsBase {
}
exports.ImsModuleProcessor = ImsModuleProcessor;
class ImsModuleReceiver extends ImsBase {
}
exports.ImsModuleReceiver = ImsModuleReceiver;
class ImsModuleSite extends ImsBase {
}
exports.ImsModuleSite = ImsModuleSite;
class ImsModuleSystemWelcome extends ImsBase {
}
exports.ImsModuleSystemWelcome = ImsModuleSystemWelcome;
class ImsModuleWxapp extends ImsBase {
}
exports.ImsModuleWxapp = ImsModuleWxapp;
