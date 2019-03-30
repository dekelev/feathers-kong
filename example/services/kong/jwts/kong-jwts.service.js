const { Jwt } = require('../../../../lib');
const hooks = require('./kong-jwts.hooks');

module.exports = function (app) {
  const options = {
    name: 'kong/jwts',
    url: app.get('kong').url,
  };

  app.use('/kong/jwts', new Jwt(options));

  const service = app.service('kong/jwts');

  service.hooks(hooks);
};
