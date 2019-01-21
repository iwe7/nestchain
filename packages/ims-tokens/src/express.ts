import { InjectionToken } from 'ims-core';
import express = require('express');
export type Express = typeof express;
export const Express = new InjectionToken<Express>('express');
