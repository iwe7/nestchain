import { fromCallback } from 'ims-rxjs';
import { of, PartialObserver } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import fs = require('fs');
import path = require('path');
import util = require('util');
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

/**
 * 区块数据库
 */

export function createPeerId(bits: number = 1024) {
  return of(null).pipe(
    switchMap(() => {
      return fromCallback((opt: PartialObserver<any>) => {});
    }),
  );
}

export async function checkInstalled() {
  let exit = await util.promisify(fs.exists)(INSTALL_LOCK);
  if (!exit) {
    let peerId = await createPeerId().toPromise();
    let data = JSON.stringify(peerId, null, 2);
    let dataParse: any = JSON.parse(data);
    let privateKey = dataParse.privKey;
    await savePeer(DEFAULT_PRIVATE_KEY, privateKey);
    await savePeer(
      INSTALL_LOCK,
      JSON.stringify(
        {
          id: dataParse.id,
          publicKey: dataParse.pubKey,
        },
        null,
        2,
      ),
    );
    return {
      id: dataParse.id,
      publicKey: dataParse.pubKey,
    };
  } else {
    let data: any = await util.promisify(fs.readFile)(INSTALL_LOCK);
    return JSON.parse(data);
  }
}

export async function savePeer(p: string, data: any) {
  try {
    let dir = path.dirname(p);
    let exits = await util.promisify(fs.exists)(dir);
    if (!exits) await util.promisify(fs.mkdir)(path.dirname(p));
    await util.promisify(fs.writeFile)(p, data);
  } catch (e) {
    console.error(e);
  }
}

checkInstalled().then(res => {
  console.log(res);
  debugger;
});
