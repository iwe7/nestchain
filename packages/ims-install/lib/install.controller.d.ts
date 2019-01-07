/// <reference types="node" />
import { Response } from 'express';
import { ImsOs } from 'ims-os';
export declare class ImsInstallController {
    os: ImsOs;
    constructor(os: ImsOs);
    index(res: Response): Promise<void>;
    getOs(): Promise<{
        arch: string;
        cpus: import("os").CpuInfo[];
        freemem: number;
        hostname: string;
        loadavg: number[];
        networkInterfaces: {
            [index: string]: import("os").NetworkInterfaceInfo[];
        };
        platform: NodeJS.Platform;
        release: string;
        tmpdir: string;
        totalmem: number;
        type: string;
        uptime: number;
        homedir: string;
    }>;
}
