const errors = require('@feathersjs/errors');
const normalizeQuery = require('../normalize-query');
const Base = require('./base');

module.exports = class Service extends Base {
  find (params) {
    const query = normalizeQuery(params, this.paginate);

    return this.fetch('consumers', {}, query);
  }

  get (id) {
    if (!id) {
      throw new errors.BadRequest('Missing consumer id');
    }

    return this.fetch(`consumers/${id}`);
  }

  create (data) {
    return this.fetch('consumers', {
      method: 'POST',
      body: data,
      json: true
    });
  }

  _update (id, data, params) {
    if (!id) {
      throw new errors.BadRequest('Missing consumer id');
    }

    return this.fetch(`consumers/${id}`, {
      method: 'PATCH',
      body: data,
      json: true
    });
  }

  patch (...args) {
    return this._update(...args);
  }

  update (...args) {
    return this._update(...args);
  }

  remove (id) {
    if (!id) {
      throw new errors.BadRequest('Missing consumer id');
    }

    return this.fetch(`consumers/${id}`, {
      method: 'DELETE'
    });
  }
};
