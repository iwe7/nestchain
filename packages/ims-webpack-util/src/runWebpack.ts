import { Configuration, Stats, compiler } from 'webpack';
import { Observable } from 'rxjs';
import { merge } from 'ims-util';
import { getBase } from './getBase';
import webpack = require('webpack');
const base = getBase();
export function runWebpack(
  config: Configuration,
  loggingCb?: (state: Stats, config: Configuration) => void,
) {
  return new Observable(obs => {
    let cfg = merge(base, config);
    const webpackCompiler = webpack(cfg);
    const callback: compiler.CompilerCallback = (err: Error, stats: Stats) => {
      if (err) {
        return obs.error(err);
      }
      loggingCb && loggingCb(stats, cfg);
      obs.next({ success: !stats.hasErrors() });
      if (!cfg.watch) {
        obs.complete();
      }
    };
    try {
      if (config.watch) {
        const watchOptions = config.watchOptions || {};
        const watching = webpackCompiler.watch(watchOptions, callback);
        console.log('webpack watch');
        return () => watching.close(() => {});
      } else {
        webpackCompiler.run(callback);
      }
    } catch (err) {
      return obs.error(err);
    }
  });
}
