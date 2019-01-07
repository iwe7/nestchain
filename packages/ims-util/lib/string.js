"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toLowerCase = (str) => str.toLowerCase();
exports.replaceTypeName = (type, replace) => {
    let className = type.name;
    className = exports.toLowerCase(className).replace(exports.toLowerCase(replace), '');
    return className;
};
exports.toDashCase = (str) => exports.toLowerCase(str
    .replace(/([A-Z0-9])/g, g => ' ' + g[0])
    .trim()
    .replace(/ /g, '-'));
function camelCase(str, firstCapital = false) {
    return str.replace(/^([A-Z])|[\s-_](\w)/g, function (match, p1, p2, offset) {
        if (firstCapital === true && offset === 0)
            return p1;
        if (p2)
            return p2.toUpperCase();
        const p1Lower = p1.toLowerCase();
        return p1Lower;
    });
}
exports.camelCase = camelCase;
function snakeCase(str) {
    return str
        .replace(/(?:([a-z])([A-Z]))|(?:((?!^)[A-Z])([a-z]))/g, function (substring, $1, $2, $3, $4, offset, ...args) {
        return `${checkString($1)}_${checkString($3)}${checkString($2)}${checkString($4)}`;
    })
        .toLowerCase();
}
exports.snakeCase = snakeCase;
function checkString(str, _ = '') {
    return str ? str : _;
}
exports.checkString = checkString;
function titleCase(str) {
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1));
}
exports.titleCase = titleCase;
function abbreviate(str, abbrLettersCount = 1) {
    const words = str
        .replace(/([a-z\xE0-\xFF])([A-Z\xC0\xDF])/g, '$1 $2')
        .split(' ');
    return words.reduce((res, word) => {
        res += word.substr(0, abbrLettersCount);
        return res;
    }, '');
}
exports.abbreviate = abbreviate;
exports.dashToPascalCase = (str) => exports.toLowerCase(str)
    .split('-')
    .map(segment => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join('');
exports.toTitleCase = titleCase;
exports.captializeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);
exports.toLTitleCase = (str) => str.charAt(0).toLowerCase() + str.slice(1);
