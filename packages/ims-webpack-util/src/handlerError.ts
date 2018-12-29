import { Stats } from 'webpack';
import chalk from 'chalk';
export const handlerError = (callback?: any) => (err: Error, stats: Stats) => {
  if (err) console.error(err);
  if (stats.hasErrors())
    console.log(
      stats
        .toJson()
        .errors.map(e => chalk.red(e))
        .join('\n'),
    );
  if (stats.hasWarnings())
    console.log(
      stats
        .toJson()
        .warnings.map(w => chalk.yellow(w))
        .join('\n'),
    );
  callback && callback();
};
