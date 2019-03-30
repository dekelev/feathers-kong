# feathers-kong

[![Build Status](https://travis-ci.org/dekelev/feathers-kong.svg?branch=master)](https://travis-ci.org/dekelev/feathers-kong)
[![Coverage Status](https://coveralls.io/repos/github/dekelev/feathers-kong/badge.svg?branch=master)](https://coveralls.io/github/dekelev/feathers-kong?branch=master)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://standardjs.com/)
[![Dependency Status](https://img.shields.io/david/dekelev/feathers-kong.svg)](https://david-dm.org/dekelev/feathers-kong)
[![npm](https://img.shields.io/npm/v/feathers-kong.svg?maxAge=3600)](https://www.npmjs.com/package/feathers-kong)

> A Feathers service for [Kong API Gateway](https://docs.konghq.com) admin API

## Installation

```
npm install feathers-kong --save
```

## Documentation

Please refer to the [Kong admin API docs](https://docs.konghq.com/1.0.x/admin-api/) for options that can be passed. Feathers service methods map to the following Kong methods:

- Feathers `find` -> Kong `list` all or when not using `Consumer` service, list resources of consumer by setting `params.query.consumer` with Kong consumer ID
- Feathers `get` -> Kong `get` resource by id by setting `id` with resource ID & when not using `Consumer` service, set `params.query.consumer` with Kong consumer ID. otherwise it will return consumer by resource ID when supported
- Feathers `create` -> Kong `create` resource. set `params.query.consumer` to create resource on consumer
- Feathers `patch` -> Kong `update` resource by id
- Feathers `update` -> Kong `update` resource by id
- Feathers `remove` -> Kong `delete` resource by id

If a method is not supported by Kong for a given resource it is not support here as well.

### Available Services

The following services are supported and map to the appropriate Kong resource:

- `Consumer`
- `Acl`
- `Jwt`
- `KeyAuth`


**This is pretty important!** Since this connects to your Kong admin API, you want to make sure that you don't expose these endpoints via your app unless the user has the appropriate permissions. You can prevent any external access by doing this:

```js
const { Forbidden } = require('@feathersjs/errors');

app.service('/kong/consumers').before({
  all: [
    context => {
      if (context.params.provider) {
        throw new Forbidden('You are not allowed to access this');
      }
    }
  ]
});
```

## Complete Example

Here's an example of a Feathers server that uses `feathers-authentication` for local auth.  It includes a `users` service that uses `feathers-mongoose`.  *Note that it does NOT implement any authorization.*

```js
const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');
const { Consumer } = require('feather-kong');

// Initialize the application
const app = feathers()
  .configure(express.rest())
  .configure(socketio())
  // Needed for parsing bodies (login)
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  // A simple Message service that we can used for testing
  .use('/kong/consumers', new Consumer({ url: 'http://localhost:8001' }))
  .use('/', feathers.static(__dirname + '/public'))
  .use(express.errorHandler({ html: false }));


function validateConsumer() {
  return function(hook) {
    console.log('Validating consumer code goes here');
  };
}


const consumerService = app.service('kong/consumers');

consumerService.before({
  create: [validateConsumer()]
});

const consumer = {
  username: 'john',
  custom_id: 'u1'
};

consumerService.create(consumer).then(result => {
  console.log('Consumer created', result);
}).catch(error => {
  console.log('Error creating consumer', error);
});

app.listen(3030);

console.log('Feathers authentication app started on 127.0.0.1:3030');
```

## License

Copyright (c) 2019

Licensed under the [MIT license](LICENSE).
