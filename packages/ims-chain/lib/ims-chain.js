"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_rxjs_1 = require("ims-rxjs");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const fs = require("fs");
const path = require("path");
const util = require("util");
exports.ROOT = process.cwd();
exports.DATA_PATH = path.join(exports.ROOT, 'www/data');
exports.CORE_DB_PATH = path.join(exports.DATA_PATH, 'coredb');
exports.INSTALL_LOCK = path.join(exports.DATA_PATH, 'install.lock');
exports.DEFAULT_PRIVATE_KEY = path.join(exports.DATA_PATH, 'private.dat');
function createPeerId(bits = 1024) {
    return rxjs_1.of(null).pipe(operators_1.switchMap(() => {
        return ims_rxjs_1.fromCallback((opt) => { });
    }));
}
exports.createPeerId = createPeerId;
async function checkInstalled() {
    let exit = await util.promisify(fs.exists)(exports.INSTALL_LOCK);
    if (!exit) {
        let peerId = await createPeerId().toPromise();
        let data = JSON.stringify(peerId, null, 2);
        let dataParse = JSON.parse(data);
        let privateKey = dataParse.privKey;
        await savePeer(exports.DEFAULT_PRIVATE_KEY, privateKey);
        await savePeer(exports.INSTALL_LOCK, JSON.stringify({
            id: dataParse.id,
            publicKey: dataParse.pubKey,
        }, null, 2));
        return {
            id: dataParse.id,
            publicKey: dataParse.pubKey,
        };
    }
    else {
        let data = await util.promisify(fs.readFile)(exports.INSTALL_LOCK);
        return JSON.parse(data);
    }
}
exports.checkInstalled = checkInstalled;
async function savePeer(p, data) {
    try {
        let dir = path.dirname(p);
        let exits = await util.promisify(fs.exists)(dir);
        if (!exits)
            await util.promisify(fs.mkdir)(path.dirname(p));
        await util.promisify(fs.writeFile)(p, data);
    }
    catch (e) {
        console.error(e);
    }
}
exports.savePeer = savePeer;
checkInstalled().then(res => {
    console.log(res);
    debugger;
});
