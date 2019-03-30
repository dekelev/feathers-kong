const normalizeQuery = require('../normalize-query');
const Base = require('./base');

module.exports = class Service extends Base {
  find(params) {
    const query = normalizeQuery(params, this.paginate);

    return this.fetch('consumers', {}, query);
  }

  get(id) {
    if (!id) {
      throw new errors.BadRequest('Missing consumer id');
    }

    return this.fetch(`consumers/${id}`);
  }

  create(data) {
    return this.fetch(`consumers`, {
      method: 'POST',
      body: data,
      json: true
    });
  }

  patch(...args) {
    return this.update(...args);
  }

  update(id, data) {
    if (!id) {
      throw new errors.BadRequest('Missing consumer id');
    }

    return this.fetch(`consumers/${id}`, {
      method: 'PATCH',
      body: data,
      json: true
    });
  }

  remove(id) {
    if (!id) {
      throw new errors.BadRequest('Missing consumer id');
    }

    return this.fetch(`consumers/${id}`, {
      method: 'DELETE',
    });
  }
};
