const errors = require('@feathersjs/errors');

module.exports = function errorHandler(error, reject, statusCode) {
  if (error.ok || (statusCode && statusCode < 400)) {
    return error;
  }

  const errMsg = error.message;
  let feathersError = error;

  if (statusCode) {
    switch (statusCode) {
      case 400: // Bad request
        feathersError = new errors.BadRequest(errMsg, error);
        break;
      case 404: // Not found
        feathersError = new errors.NotFound(errMsg, error);
        break;
      case 405: // Operation unsupported
        feathersError = new errors.MethodNotAllowed(errMsg, error);
        break;
      case 409: // Unique violation
        feathersError = new errors.Conflict(errMsg, error);
        break;
      case 500: // Database error
      default:
        feathersError = new errors.GeneralError(errMsg, error);
    }
  } else {
    feathersError = new errors.GeneralError(errMsg || 'Unknown API Gateway Error', error);
  }

  if (reject)
    return reject(feathersError);
  else
    return Promise.reject(feathersError);
};
