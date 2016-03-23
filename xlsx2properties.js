'use strict';
var XLSX = require('xlsx');
var fs = require("fs");
var worksheet = null;
var range = null;
var languages = [];

if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " input.xlsx");
    process.exit(-1);
}
var input = process.argv[2];
var type = "properties";
if (process.argv.length > 3) {
    type = process.argv[3];
}
 
console.log('Processing...' + input);

var init = function () {
    var workbook = XLSX.readFile(input);
    var name = workbook.SheetNames[0];

    worksheet = workbook.Sheets[name];
    var ref = worksheet ['!ref'];
    range = XLSX.utils.decode_range(ref);
    
    //init languages
    var columnMax = range.e.c;
    var cells = [];
    
    for(var c = 1; c <= columnMax; c++) {
        var cell = XLSX.utils.encode_cell({c:c, r:0});
        cells.push(cell);
    }
    for (var idx in cells) {
        languages.push(get_cell_value(cells[idx]));
    }
}

var write_all = function () {
    for (var idx in languages) {
        console.log("Writing..." + languages[idx]);
        if (type == 'properties') {
            write_properties(languages[idx], idx - 0 + 1);
        }
    }
}

var write_properties = function (language, language_col) {
    var file = fs.createWriteStream(language, {
        encoding: "utf-8"
    });
    var rowMax = range.e.r;
    
    for (var r = 1; r <= rowMax; r++) {
        var key_cell = XLSX.utils.encode_cell({ c: 0, r: r });
        var key_value = get_cell_value(key_cell);
        var lang_cell = XLSX.utils.encode_cell({ c: language_col, r: r});
        var lang_value = get_cell_value(lang_cell);
        file.write(key_value + '=' + lang_value);
        file.write('\n');
    }
    file.end();
}

function get_cell_value (address) {
    var cell = null;
    if (typeof address === 'string') {
        cell = worksheet[address];
    } else {
        //json {c: column_idx, r: row_idx }
        var str_addr = XLSX.utils.encode_cell(address);
        cell = worksheet[str_addr];
    }
    if (cell != undefined) {
        return cell.v;
    }
    return '';
}

init ();
write_all();
