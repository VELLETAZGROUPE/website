var ase = require("ase-util");
var fs = require("fs");

var buffer = ase.read(fs.readFileSync("Nuancier.ase"));
console.dir(buffer, { depth: null });
