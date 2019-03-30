const { KeyAuth } = require('../../../../lib');
const hooks = require('./kong-key-auths.hooks');

module.exports = function (app) {
  const options = {
    name: 'kong/key-auths',
    url: app.get('kong').url,
  };

  app.use('/kong/key-auths', new KeyAuth(options));

  const service = app.service('kong/key-auths');

  service.hooks(hooks);
};
