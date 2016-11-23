var wellknown = require('./wellknown');
var fs = require('fs');
var path = require ('path');
var slug = require('slug');

var dir = process.argv[2];

//console.log('Pricessing directory...' + dir)

parseDir (dir);

console.log("identifier;name;area");

function parse(filename) {
 // console.log("Processing file..." + filename);
 var json = JSON.parse(fs.readFileSync(filename, 'utf8'));

 for (var idx in json.features) {
    var feature = json.features[idx];
    var wkt = wellknown.stringify(feature);
    var name = feature.properties['name'];
    var identifier = 'VN_PROVINCE_' + slug(name.toUpperCase(), '_')
    //console.log(identifier);
    console.log(identifier + ';' + name + ';' + wkt);
 }
}

function parseDir(dir) {
  fs.readdir(dir, function (err, files) {
   files.filter(
     function (file) { 
       ext = path.extname (file);
       return ext.indexOf('.geojson') >= 0;
     }
   ).forEach(function (file) {
     parse (file);
   });
 });
}

