import webpack = require('webpack');
import { InjectionToken } from 'ims-core';
export const WebpackConfigurations = new InjectionToken<
  webpack.Configuration[]
>('WebpackConfigurations');
