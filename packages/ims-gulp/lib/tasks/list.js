"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
function listDirTask(dir) {
    let files = [];
    fs.readdirSync(dir)
        .map(res => ({
        name: res,
        path: path.join(dir, res),
    }))
        .forEach(file => {
        let stat = fs.statSync(file.path);
        if (stat.isDirectory()) {
            files.push(file);
        }
    });
    return files;
}
exports.listDirTask = listDirTask;
