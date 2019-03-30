const consumer = require('./kong/consumers/kong-consumers.service.js');
const acl = require('./kong/acls/kong-acls.service.js');
const jwt = require('./kong/jwts/kong-jwts.service.js');
const keyAuth = require('./kong/key-auths/kong-key-auths.service.js');

module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars

  app.configure(consumer);
  app.configure(acl);
  app.configure(jwt);
  app.configure(keyAuth);
};
