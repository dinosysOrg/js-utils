'use strict';
var slug = require('slug');
var wrapper = require('./xlsxwrapper.js');

if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " input.xlsx");
    process.exit(-1);
}

var input = process.argv[2];

wrapper.init(input);

var sheetName = wrapper.sheetName(0);
var ymax = wrapper.ymax(sheetName);

for (var y = 1; y <= ymax; y++) {
    var str = wrapper.cellValue(sheetName, 0, y);
    wrapper.cellValue(sheetName, 1, y, slug(str).toLowerCase());
}
wrapper.cellValue(sheetName, 1, 1, 'identifier');
wrapper.write('generated-' + input);