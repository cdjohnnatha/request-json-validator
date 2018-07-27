# request-json-validator
The request-json-validator analyse the json validations using the [jsonschema: ^1.2.4](https://www.npmjs.com/package/jsonschema) but checks
empty spaces and if is not valid throw a node error.

[![Code style: airbnb](https://img.shields.io/badge/code%20style-airbnb-blue.svg?style=flat-square)](https://github.com/airbnb/javascript)
![node (scoped with tag)](https://img.shields.io/node/v/@stdlib/stdlib/latest.svg)

## Dependencies

* [jsonschema: ^1.2.4](https://www.npmjs.com/package/jsonschema)


## jsonValidator
The validation uses a request comparison with a json file following [json org api](http://jsonapi.org). The function check the 
required fields and throw a json error joining all errors from jsonschema in unique message.

### Usage Example

```
const { CommonError } = require('../lib/HttpErrors');
// I recommend that for you put your jsons schemas in a separeted folder.

let jsonTest = {
    { 
      "id": "/users",
      "type": "object",
      "properties":{
        "login": { "type": "string" },
        "password": { "type": "string" },
        "first_name": { "type": "string" },
        "last_name": { "type": "string" },
        "lang": { "type": "string" },
        "active": { "type": "boolean" }
      },
      "required": [
        "login",
        "password",
        "first_name",
        "last_name",
        "lang",
        "active"
      ]
    }
}

exports.create = async (request, response) => {
    try {
        const params = request.params;
        await ValidateRequestInput(params, jsonTest);
        return 'worked';
    } catch (error) {
        CommonError(error);
    }
}
```
