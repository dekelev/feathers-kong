const { expect } = require('chai');
const errors = require('@feathersjs/errors');
const errorHandler = require('../lib/error-handler');

describe('errorHandler', () => {
  describe('when it is not a Kong error', () => {
    it('returns original error', () => {
      return errorHandler(new Error('Normal Error')).catch(e => {
        expect(e instanceof Error).to.equal(true);
        expect(e.message).to.equal('Normal Error');
      });
    });
  });

  describe('when it is a Kong error', () => {
    let error;

    beforeEach(() => (error = new Error('Kong Error')));

    it('handles BadRequest error', () => {
      return errorHandler(error, null, 400).catch(e => {
        expect(e instanceof errors.BadRequest).to.equal(true);
      });
    });

    it('handles NotFound error', () => {
      return errorHandler(error, null, 404).catch(e => {
        expect(e instanceof errors.NotFound).to.equal(true);
      });
    });

    it('handles MethodNotAllowed error', () => {
      return errorHandler(error, null, 405).catch(e => {
        expect(e instanceof errors.MethodNotAllowed).to.equal(true);
      });
    });

    it('handles Conflict error', () => {
      return errorHandler(error, null, 409).catch(e => {
        expect(e instanceof errors.Conflict).to.equal(true);
      });
    });

    it('handles GeneralError error', () => {
      return errorHandler(error, null, 500).catch(e => {
        expect(e instanceof errors.GeneralError).to.equal(true);
      });
    });

    it('handles unknown Kong errors', () => {
      return errorHandler(error).catch(e => {
        expect(e instanceof errors.GeneralError).to.equal(true);
        expect(e.message).to.equal('Kong Error');
      });
    });
  });
});
