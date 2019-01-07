import { Configuration, Stats } from 'webpack';
import * as WebpackDevServer from 'webpack-dev-server';
import { Observable } from 'rxjs';
export declare function runWebpackDevServer(webpackConfig: Configuration, devServerCfg?: WebpackDevServer.Configuration, loggingCb?: (state: Stats, config: Configuration) => void): Observable<{}>;
