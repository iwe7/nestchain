import { Component } from 'react';
export interface IGetOs {
    arch?: string;
    hostname?: string;
    platform?: string;
    uptime?: number;
    type?: string;
    freemem?: number;
    tmpdir?: string;
    totalmem?: number;
    release?: string;
    homedir?: string;
    cpus?: any[];
}
export declare class AppIndex extends Component<any, IGetOs> {
    state: IGetOs;
    componentDidMount(): Promise<void>;
    render(): JSX.Element;
}
