const { expect } = require('chai');
const normalize = require('../lib/normalize-query');

describe('normalizeQuery', () => {
  describe('when $limit & $skip are present', () => {
    const params = {
      customer: 1,
      query: {
        $limit: 5,
        $skip: 'next',
        name: 'bob'
      }
    };

    it('replaces $limit with size', () => {
      const query = normalize(params);
      expect(query.$limit).to.equal(undefined);
      expect(query.size).to.equal(5);
    });

    it('replaces $skip with offset', () => {
      const query = normalize(params);
      expect(query.$skip).to.equal(undefined);
      expect(query.offset).to.equal('next');
    });

    it('does not modify original params', () => {
      const paramsCopy = Object.assign({}, params);
      normalize(params);
      expect(params).to.deep.equal(paramsCopy);
    });

    it('returns original query object params', () => {
      const query = normalize(params);
      expect(query.name).to.equal('bob');
    });
  });

  describe('when $limit & $skip are not present', () => {
    it('returns original query object', () => {
      const params = {
        customer: 1,
        query: {
          name: 'bob'
        }
      };
      const query = normalize(params);
      expect(query).to.deep.equal({ name: 'bob' });
    });
  });
});
