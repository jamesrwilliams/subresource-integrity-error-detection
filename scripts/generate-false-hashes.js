const crypto = require("crypto");
const fs = require('fs');
const path = require("path");

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const writeFiles = (fileName, content) => {
  let write_path = path.join(__dirname, `../cypress/utils/${fileName}.json`);
  fs.writeFileSync(write_path , JSON.stringify(content, null ,2));
}

const incorrect_hashes = {};
const invalid_hashes = {};

const ALGORITHMS = ['sha256', 'sha384', 'sha512'];
let newArray = [...ALGORITHMS];
shuffleArray(newArray);


ALGORITHMS.forEach((algorithm, index) => {
  let hashDigest = crypto.createHash(algorithm).update(Date.now().toString()).digest('base64');
  let invalidHashType = newArray[index];
  incorrect_hashes[algorithm] = `${algorithm}-${hashDigest}`
  invalid_hashes[invalidHashType] = `${invalidHashType}-${hashDigest}`;
});

const fakeHashes = {
  incorrect: incorrect_hashes,
  invalid: invalid_hashes,
}

writeFiles('fake-hashes', fakeHashes);
