import webpack = require('webpack');
import { InjectionToken } from 'ims-core';

export const WebpackConfigurations = new InjectionToken<
  webpack.Configuration[]
>('WebpackConfigurations');

export const moduleRulesToken = new InjectionToken<webpack.RuleSetRule[]>(
  'moduleRulesToken',
);

export const resolvePluginsToken = new InjectionToken<webpack.ResolvePlugin[]>(
  'resolvePluginsToken',
);
export const PluginsToken = new InjectionToken<webpack.RuleSetRule[]>(
  'PluginsToken',
);

export const OutputToken = new InjectionToken<webpack.Output>('OutputToken');
