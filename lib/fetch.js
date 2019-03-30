const { URL } = require('url');
const fetch = require('node-fetch');
const errorHandler = require('./error-handler');

module.exports = function (baseUrl, defaultOptions) {
  return function (path, options, query) {
    const opts = Object.assign({}, defaultOptions, options);

    if (opts.json) {
      opts.body = JSON.stringify(opts.body);
      opts.headers = Object.assign({}, opts.headers, { 'Content-Type': 'application/json' });
    }

    const url = new URL(`${baseUrl}/${path}`);

    if (query)
      Object.keys(query).forEach(key => url.searchParams.append(key, query[key]));

    return new Promise((resolve, reject) => {
      let statusCode = 0;

      fetch(url, opts)
        .then(res => {
          statusCode = res.status;

          if (statusCode === 204) {
            resolve({});
            return;
          }

          return res;
        })
        .then(res => res.json())
        .then(res => errorHandler(res, reject, statusCode))
        .then(res => {
          if (res.data && !Array.isArray(res.data))
            res.data = [];

          resolve(res)
        })
        .catch(err => errorHandler(err, reject, statusCode));
    });
  }
};
