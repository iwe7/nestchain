import { ObjectID } from 'typeorm';
export declare class Log {
    id: ObjectID;
    ip: string;
    port: number;
    status: number;
    package: string;
    service: string;
    method: string;
    params: string;
}
