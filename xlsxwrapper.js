'use strict';
//npm install xlsx
var XLSX = require('xlsx');
var exports = module.exports = {};
var MAX = 1000;

exports.init = function (xlsxfile) {
    this.workbook = XLSX.readFile(xlsxfile);
}

exports.sheetName = function (idx) {
    return this.workbook.SheetNames[idx];
}

exports.sheet = function (name) {
    return this.workbook.Sheets[name];
}

exports.range = function (name) {
    var worksheet = this.sheet(name);
    var ref = worksheet ['!ref'];
    return XLSX.utils.decode_range(ref);
}

exports.xmax = function (name) {
    return this.range(name).e.c;
}

exports.ymax = function (name) {
    return this.range(name).e.r;
}

exports.cell = function (sheet, x, y) {
    var addr = { c: x, r: y };
    var strAddr = XLSX.utils.encode_cell(addr);
    var worksheet = this.sheet(sheet);
    return worksheet[strAddr];
}
exports.cellValue = function (sheet, x, y, val) {
    var c = this.cell(sheet, x, y);
    if (c != undefined) {
        if (val != undefined) {
            c.v = val;
        }
        return c.v;
    }
    return null;
}

exports.row = function (sheet, y) {
    var xmax = this.range(sheet).e.c;
    var row = [];
    for (var x = 0; x <= xmax; x++) {
        row.push(this.cell(sheet, x, y));
    }
    return row;
}
exports.rowvalues = function (sheet, y) {
    var values = [];
    var xmax = this.range(sheet).e.c;
    for (var x = 0; x <= xmax; x++) {
        values.push(this.cellValue(sheet, x, y));
    }
    return values;
}
exports.write = function (file) {
    XLSX.writeFile(this.workbook, file);
}