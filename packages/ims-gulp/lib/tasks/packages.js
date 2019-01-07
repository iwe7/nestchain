"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _gulp_1 = require("./_gulp");
const path_1 = require("path");
const fs = require("fs");
const ims_const_1 = require("ims-const");
const rxjs_1 = require("rxjs");
const _gulp = require("gulp");
const operators_1 = require("rxjs/operators");
const list_1 = require("./list");
exports.gulpPackages = () => {
    return _gulp_1.gulp(path_1.join(ims_const_1.ROOT, 'packages'), path_1.join(ims_const_1.ROOT, 'publish'))(false)
        .pipe(operators_1.concatMap(() => {
        return rxjs_1.from(list_1.default(path_1.join(ims_const_1.ROOT, 'publish'))
            .map(file => ({
            name: file.name,
            path: path_1.join(file.path, 'src'),
        }))
            .filter(res => fs.existsSync(res.path))).pipe(operators_1.switchMap(res => {
            return new rxjs_1.Observable(obs => {
                let stream = _gulp
                    .src([res.path + '/**/*', res.path + '/*'])
                    .pipe(_gulp.dest(path_1.join(ims_const_1.ROOT, 'packages', res.name, 'lib')));
                stream.on('end', () => {
                    obs.next();
                    obs.complete();
                });
            });
        }));
    }))
        .subscribe(res => {
        console.log(res);
        console.log('finish');
    });
};
