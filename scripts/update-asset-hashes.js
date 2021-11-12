const crypto = require("crypto");
const fs = require('fs');
const path = require("path");

const ALGORITHMS = ['sha256', 'sha384', 'sha512'];
const ASSET_PATH = path.join(__dirname, '../cypress/utils');
const files = fs.readdirSync(ASSET_PATH);

const getHashForFile = (path, algorithm = 'sha256') => {
  return crypto.createHash(algorithm).update(fs.readFileSync(path)).digest('base64');
}

const output = {};

files.forEach((file) => {

  const hashes = {};

  ALGORITHMS.forEach((algorithm) => {
    hashes[algorithm] = getHashForFile(path.join(ASSET_PATH, file), algorithm);
  });

  output[file] = hashes;

});

fs.writeFileSync( path.resolve(ASSET_PATH, 'asset-hashes.json'), JSON.stringify(output, null ,2));




