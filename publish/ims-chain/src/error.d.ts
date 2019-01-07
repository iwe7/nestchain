export declare class PeerUpdateError extends Error {
    code: number;
    description: string;
    constructor(code: number, msg: string, description: string);
    toString(): string;
}
