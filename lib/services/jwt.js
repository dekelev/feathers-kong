const errors = require('@feathersjs/errors');
const normalizeQuery = require('../normalize-query');
const Base = require('./base');

module.exports = class Service extends Base {
  find(params) {
    const query = normalizeQuery(params, this.paginate);
    const path = query.consumer ? `consumers/${query.consumer}/jwt` : `jwts`;
    delete query.consumer;

    return this.fetch(path, {}, query);
  }

  get(id, params) {
    if (!id) {
      throw new errors.BadRequest('Missing jwt id');
    }

    const query = normalizeQuery(params, this.paginate);
    const path = query.consumer ? `consumers/${query.consumer}/jwt/${id}` : `jwts/${id}/consumer`;
    delete query.consumer;

    return this.fetch(path);
  }

  create(data, params) {
    const query = normalizeQuery(params, this.paginate);

    if (!query.consumer) {
      throw new errors.BadRequest('Missing consumer id');
    }

    const path = `consumers/${query.consumer}/jwt`;
    delete query.consumer;

    return this.fetch(path, {
      method: 'POST',
      body: data,
      json: true
    });
  }

  patch(...args) {
    return this.update(...args);
  }

  update(id, data, params) {
    const query = normalizeQuery(params, this.paginate);

    if (!query.consumer) {
      throw new errors.BadRequest('Missing consumer id');
    }

    return this.fetch(`consumers/${query.consumer}/jwt/${id}`, {
      method: 'PATCH',
      body: data,
      json: true
    });
  }

  remove(id, params) {
    if (!id) {
      throw new errors.BadRequest('Missing jwt id');
    }

    const query = normalizeQuery(params, this.paginate);

    if (!query.consumer) {
      throw new errors.BadRequest('Missing consumer id');
    }

    const path = `consumers/${query.consumer}/jwt/${id}`;
    delete query.consumer;

    return this.fetch(path, {
      method: 'DELETE',
    })
  }
};
