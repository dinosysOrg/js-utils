'use strict';
var fs = require("fs");
var wrapper = require('./xlsxwrapper.js');

if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " input.xlsx");
    process.exit(-1);
}

var input = process.argv[2];
wrapper.init(input);
var sheetName = wrapper.sheetName(0);
var header = wrapper.rowvalues(sheetName, 0);

var writeProperties = function (language, x) {
    var file = fs.createWriteStream(language, {
        encoding: "utf-8"
    });
    var ymax = wrapper.range(sheetName).e.r;
    
    for (var y = 1;  y <= ymax; y++) {
        var keyValue = wrapper.cellValue(sheetName, 0, y);
        var langValue = wrapper.cellValue(sheetName, x, y);
        file.write(keyValue + '=' + langValue);
        file.write('\n');
    }
    file.end();
}

var writeAll = function () {
    for (var idx in header) {
        if (idx == 0) continue;
        console.log("Writing..." + header[idx]);
        writeProperties(header[idx], idx);
    }
}

writeAll();