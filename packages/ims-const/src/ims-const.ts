import path = require('path');
export const ROOT = process.cwd();
/**
 * 数据目录
 */
export const DATA_PATH = path.join(ROOT, 'www/data');
/**
 * 核心数据库
 */
export const CORE_DB_PATH = path.join(DATA_PATH, 'coredb');
/**
 * 安装文件
 */
export const INSTALL_LOCK = path.join(DATA_PATH, 'install.lock');
/**
 * 默认私钥目录
 */
export const DEFAULT_PRIVATE_KEY = path.join(DATA_PATH, 'private.dat');

export const PUBLIC_PATH = path.join(ROOT, 'www/public');
export const WEB_TEMPLATE_PATH = path.join(PUBLIC_PATH, 'web');
export const WEB_TEMPLATE_INDEX_PATH = path.join(
  WEB_TEMPLATE_PATH,
  'index.html',
);

export const MOBILE_TEMPLATE_PATH = path.join(PUBLIC_PATH, 'mobile');
export const MOBILE_TEMPLATE_INDEX_PATH = path.join(
  MOBILE_TEMPLATE_PATH,
  'index.html',
);

export const ADDONS_SRC_PATH = path.join(ROOT, 'src/addons');
export const ADDONS_BUILD_PATH = path.join(ROOT, 'www/addons');
