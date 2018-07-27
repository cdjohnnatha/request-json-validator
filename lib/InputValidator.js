const Validator = require('jsonschema').validate;
/**
 * @param {Object} params - Params from request.
 * @param {Object} schema - JSON Schema.
 * @throws {ValidationError} - Error from jsonSchema validator.
 */
async function ValidateRequestInput(params, schema) {
  if (Object.keys(params).length === 0 && params.constructor === Object) {
    createError('Empty object', 406, null);
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
    createError(message, 406);
  }
  Object.entries(params).forEach((entry) => {
    const [key, value] = entry;
    if (value === '') {
      createError(`Required field ${key} cannot be empty`, 406);
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
    createError(undefined, 500, 'Id undefined');
  }
  return id;
}

/**
 *
 * @param {string} message - to be show in error message;
 * @param {number} code - http code to be show in the message;
 * @param {string} stack - stack of error.
 */
function createError(message, code, stack) {
  let error = new Error(message);
  error.stack = stack || null;
  error.code = code;
  error.httpStatusCode = code;

  throw error;
};

module.exports = {
  ValidateRequestInput,
  ValidateIdInput,
};
