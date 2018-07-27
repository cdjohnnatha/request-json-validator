const Validator = require('jsonschema').validate;
const { UnprocessableEntity, NotAcceptable } = require('./HttpErrors');
/**
 * @param {Object} params - Params from request.
 * @param {Object} schema - JSON Schema.
 * @throws {ValidationError} - Error from jsonSchema validator.
 */
async function ValidateRequestInput(params, schema) {
  if (Object.keys(params).length === 0 && params.constructor === Object) {
    NotAcceptable();
  }
  const validation = Validator(params, schema).errors;
  if (validation.length !== 0) {
    let message = 'required: ';
    let argument;
    await validation.forEach((error) => {
      argument = Array.isArray(error.stack) ? error.stack[0] : error.stack;
      message += argument.replace(/["']/g, '');
      message += ', ';
    });
    message = message.substr(0, (message.length - 2));
    let error = new Error(message);
    error.httpStatusCode = 406;
  }
  Object.entries(params).forEach((entry) => {
    const [key, value] = entry;
    if (value === '') {
      NotAcceptable(`Required field ${key} cannot be empty`);
    }
  });
}

/**
 * @param {Object} params - Params from request.
 * @param {Object} schema - JSON Schema.
 * @throws {ValidationError} - Error from jsonSchema validator.
 */
function ValidateIdInput(id) {
  if (id === undefined) {
    NotAcceptable();
  }
  return id;
}

module.exports = {
  ValidateRequestInput,
  ValidateIdInput,
};
