/// <reference types="node" />
import os = require('os');
export declare class ImsOs {
    getOs(): {
        arch: string;
        cpus: os.CpuInfo[];
        freemem: number;
        hostname: string;
        loadavg: number[];
        networkInterfaces: {
            [index: string]: os.NetworkInterfaceInfo[];
        };
        platform: NodeJS.Platform;
        release: string;
        tmpdir: string;
        totalmem: number;
        type: string;
        uptime: number;
        homedir: string;
    };
}
