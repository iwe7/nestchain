import { ProxyFactory } from 'ims-core';
import { EventEmitter as _EventEmitter } from 'events';
export const EventEmitter = ProxyFactory.create(_EventEmitter);
