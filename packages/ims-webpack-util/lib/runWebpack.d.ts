import { Configuration, Stats } from 'webpack';
import { Observable } from 'rxjs';
export declare function runWebpack(cfg: Configuration, loggingCb?: (state: Stats, config: Configuration) => void): Observable<{}>;
