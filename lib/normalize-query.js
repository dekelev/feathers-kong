module.exports = function normalizeQuery (params, paginate) {
  let query = Object.assign({}, params.query);

  if (paginate && paginate.default) {
    const lower = query.$limit ? Number(query.$limit) : paginate.default;
    const upper = typeof paginate.max === 'number' ? paginate.max : Number.MAX_VALUE;

    query.size = Math.min(lower, upper);
    delete query.$limit;
  }

  if (query.$limit) {
    query.size = query.$limit;
    delete query.$limit;
  }

  if (query.$skip) {
    query.offset = query.$skip;
    delete query.$skip;
  }

  return query;
};
