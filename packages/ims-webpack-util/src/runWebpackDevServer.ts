import { Configuration, Stats } from 'webpack';
import * as WebpackDevServer from 'webpack-dev-server';
import { Observable } from 'rxjs';
import webpack = require('webpack');
import { merge } from 'ims-util';
import { getBase } from './getBase';
const base = getBase();
export function runWebpackDevServer(
  webpackConfig: Configuration,
  devServerCfg?: WebpackDevServer.Configuration,
  loggingCb?: (state: Stats, config: Configuration) => void,
) {
  return new Observable(obs => {
    const devServerConfig =
      devServerCfg || (webpackConfig as any).devServer || {};
    devServerConfig.host = devServerConfig.host || 'localhost';
    devServerConfig.port = devServerConfig.port || 8080;
    if (devServerConfig.stats) {
      webpackConfig.stats = devServerConfig.stats as webpack.Stats.ToStringOptionsObject;
    }
    devServerConfig.stats = false;
    let cfg = merge(base, webpackConfig);
    const webpackCompiler = webpack(cfg);
    const server = new WebpackDevServer(webpackCompiler, devServerConfig);
    webpackCompiler.hooks.done.tap('build-webpack', stats => {
      loggingCb(stats, cfg);
      obs.next({ success: !stats.hasErrors() });
    });
    server.listen(devServerConfig.port, devServerConfig.host, err => {
      if (err) {
        obs.error(err);
      }
    });
    return () => server.close();
  });
}
