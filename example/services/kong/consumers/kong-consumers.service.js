const { Consumer } = require('../../../../lib');
const hooks = require('./kong-consumers.hooks');

module.exports = function (app) {
  const options = {
    name: 'kong/consumers',
    url: app.get('kong').url,
    paginate: {
      default: 2,
      max: 4
    },
  };

  app.use('/kong/consumers', new Consumer(options));

  const service = app.service('kong/consumers');

  service.hooks(hooks);
};
