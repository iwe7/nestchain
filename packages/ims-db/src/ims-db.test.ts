import { ImsDb } from './ims-db';

/**
 * 新建操作实例
 */
let c = new ImsDb();

c.connect('ws://127.0.0.1:6006');

// 验证交易信息
