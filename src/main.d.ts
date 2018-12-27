import 'reflect-metadata';
import { ImsInstallService } from 'ims-install';
import { Response } from 'express';
export declare class IndexController {
    private install;
    constructor(install: ImsInstallService);
    index(res: Response): Promise<string>;
}
export declare class ApplicationModule {
}
