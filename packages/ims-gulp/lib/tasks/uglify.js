"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gulp = require("gulp");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const ims_rxjs_1 = require("ims-rxjs");
const path = require("path");
const fs = require("fs");
const ims_const_1 = require("ims-const");
const list_1 = require("./list");
function _uglify() {
    console.log(`run task uglify!!!!`);
    let obss = [];
    list_1.listDirTask(path.join(ims_const_1.ROOT, 'packages')).forEach(name => {
        obss.push(createUglify(name.name));
    });
    return ims_rxjs_1.forkJoin(...obss);
}
exports._uglify = _uglify;
function createUglify(name) {
    let filePath = path.join(ims_const_1.ROOT, 'packages', name, 'lib');
    if (fs.existsSync(filePath)) {
        return new ims_rxjs_1.Observable(obs => {
            let srcs = [
                `${ims_const_1.ROOT}/packages/${name}/lib/**/*.js`,
                `${ims_const_1.ROOT}/packages/${name}/lib/*.js`,
            ];
            let stream = gulp
                .src(srcs)
                .pipe(uglify())
                .pipe(concat(`${name}.min.js`))
                .pipe(gulp.dest(`${ims_const_1.ROOT}/packages/${name}/dist`));
            stream.on('end', () => {
                console.log(name + 'end');
                obs.next();
                obs.complete();
            });
        });
    }
    else {
        console.log(`${name} lib not exist`);
        return ims_rxjs_1.of(null);
    }
}
