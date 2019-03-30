const { Acl } = require('../../../../lib');
const hooks = require('./kong-acls.hooks');

module.exports = function (app) {
  const options = {
    name: 'kong/acls',
    url: app.get('kong').url,
  };

  app.use('/kong/acls', new Acl(options));

  const service = app.service('kong/acls');

  service.hooks(hooks);
};
