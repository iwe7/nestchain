import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ImsInstallService } from './install.service';
export declare class InstallGuard implements CanActivate {
    install: ImsInstallService;
    constructor(install: ImsInstallService);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
