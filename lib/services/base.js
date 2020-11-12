const fetch = require('../fetch');

module.exports = class BaseService {
  constructor (options = {}) {
    if (!options.url) {
      throw new Error('Kong `url` needs to be provided');
    }

    this.id = 'id';
    this.paginate = options.paginate || {};
    this.fetch = fetch(options.url, { timeout: options.timeout || 30000 });
  }
};
