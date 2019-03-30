const { expect } = require('chai');
const kong = require('../lib');

const CLASSES = [
  'Consumer',
  'Acl',
  'Jwt',
  'KeyAuth'
];

describe('feathers-kong', () => {
  it('exports expected classes', () => {
    CLASSES.forEach(name => {
      expect(typeof kong[name]).to.equal('function');
    });
  });
});
