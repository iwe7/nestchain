export declare abstract class ImsAccount {
    readonly accountId: string;
    constructor(accountId: string);
    static create(accountId: string): void;
}
export declare abstract class ImsBase {
}
export declare abstract class ImsModule extends ImsBase {
}
export declare abstract class ImsModuleCron extends ImsBase {
}
export declare abstract class ImsModuleHook extends ImsBase {
}
export declare abstract class ImsModuleMobile extends ImsBase {
}
export declare abstract class ImsModulePhoneapp extends ImsBase {
}
export declare abstract class ImsModuleProcessor extends ImsBase {
}
export declare abstract class ImsModuleReceiver extends ImsBase {
}
export declare abstract class ImsModuleSite extends ImsBase {
}
export declare abstract class ImsModuleSystemWelcome extends ImsBase {
}
export declare abstract class ImsModuleWxapp extends ImsBase {
}
