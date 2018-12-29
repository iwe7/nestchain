import { Observable, from } from 'rxjs';
import { Configuration } from 'webpack';
export function loadWebpackConfig(
  webpackConfigPath: string,
): Observable<Configuration> {
  return from(import(webpackConfigPath));
}
