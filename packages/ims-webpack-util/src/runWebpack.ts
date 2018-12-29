import { Configuration, Stats, compiler } from 'webpack';
import { Observable } from 'rxjs';
import * as webpack from 'webpack';
export function runWebpack(
  cfg: Configuration,
  loggingCb?: (state: Stats, config: Configuration) => void,
) {
  return new Observable(obs => {
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
      if (cfg.watch) {
        const watchOptions = cfg.watchOptions || {};
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
