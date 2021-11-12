const asset_hashes = require('./utils/asset-hashes');
const fake_hashes = require('./utils/fake-hashes');

const { incorrect, invalid } = fake_hashes;

const test_cases = {
  'basic-sri-violation' : {
    title: 'Basic SRI integrity error',
    tagName: 'script',
    asset: {
      integrity: incorrect.sha256,
      file: 'alert.js'
    },
    expectedErrorType: 'INTEGRITY'
  },
  'basic-happy-path' : {
    title: 'If the SRI value is valid, do nothing',
    tagName: 'script',
    asset: {
      integrity: asset_hashes['example.js'],
      file: 'example.js'
    },
    expectedErrorType: 'NONE'
  }
}

export default test_cases;
