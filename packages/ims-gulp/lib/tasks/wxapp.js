"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const gulp = require("gulp");
const ims_const_1 = require("ims-const");
const rxjs_1 = require("rxjs");
async function gulpWeixin() {
    let name = 'ims-wxapp-demo';
    let deps = [
        'ims-core',
        'ims-rxjs',
        'reflect-metadata',
        'tslib',
        'ims-util',
        'ims-decorator',
        'ims-http',
        'ims-platform-wxapp',
    ];
    let packageJson = {
        name: name,
        version: '1.0',
        dependencies: deps.map(dep => `${dep}:"*"`),
    };
    deps.map(async (dep) => {
        await miniprogramNpm(name, dep).toPromise();
    });
    fs.writeFileSync(path.join(ims_const_1.ROOT, 'packages', name, 'lib', 'package.json'), JSON.stringify(packageJson, null, 2));
}
exports.gulpWeixin = gulpWeixin;
function miniprogramNpm(base, name) {
    let rootPath = path.join(ims_const_1.ROOT, 'packages', name);
    if (fs.existsSync(rootPath)) {
        return new rxjs_1.Observable(obser => {
            let stream = gulp
                .src([
                `${ims_const_1.ROOT}/packages/${name}/lib/**/*.js`,
                `${ims_const_1.ROOT}/packages/${name}/lib/*.js`,
            ])
                .pipe(gulp.dest(`${ims_const_1.ROOT}/packages/${base}/lib/miniprogram_npm/${name}`));
            stream.on('end', () => {
                obser.next();
                obser.complete();
            });
        });
    }
    else {
        return rxjs_1.of(null);
    }
}
exports.miniprogramNpm = miniprogramNpm;
