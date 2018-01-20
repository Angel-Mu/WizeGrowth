const request = require('request');

const bambooAPI = `https://${process.env.API_KEY}:x@api.bamboohr.com/api/gateway.php/${process.env.COMPANY_NAME}/v1`;
const errorMessages = {
  400: 'The request was invalid or could not be understood by the server. Resubmitting the request will likely result in the same error.',
  401: 'Your API key is missing.',
  403: 'The application is attempting to perform an action it does not have privileges to access. Verify your API key belongs to an enabled user with the required permissions.',
  404: 'The resource was not found with the given identifier. Either the URL given is not a valid API, or the ID of the object specified in the request is invalid.',
  406: 'The request contains references to non-existent fields.',
  409: 'The request attempts to create a duplicate. For employees, duplicate emails are not allowed. For lists, duplicate values are not allowed.',
  429: 'The account has reached its employee limit. No additional employees could be added.',
  500: 'The server encountered an error while processing your request and failed.',
  502: 'The load balancer or web server had trouble connecting to the Bamboo app. Please try the request again.',
  503: 'The service is temporarily unavailable. Please try the request again.'
};

function listEmployees() {
  return new Promise(function (resolve, reject) {
    request.get({
      url: `${bambooAPI}/employees/directory`,
      json: true
    }, function (err, response) {
      if (err || response.statusCode !== 200) {
        reject(err || {status: response.statusCode, message: errorMessages[response.statusCode]});
      } else {
        resolve(response);
      }
    })
  });
}

function getEmployee(number) {
  return new Promise(function (resolve, reject) {
    request.get({
      url: `${bambooAPI}/employees/${number}`,
      json: true,
      qs: {
        fields: 'displayName,firstName,lastName,preferredName,gender,jobTitle,workEmail'
      }
    }, function (err, response) {
      if (err || response.statusCode !== 200) {
        reject(err || {status: response.statusCode, message: errorMessages[response.statusCode]});
      } else {
        resolve(response);
      }
    })
  });
}

function listPositions() {
  return new Promise(function (resolve, reject) {
    request.get({
      url: `${bambooAPI}/meta/lists/17`,
      json: true
    }, function (err, response) {
      if (err || response.statusCode !== 200) {
        reject(err || {status: response.statusCode, message: errorMessages[response.statusCode]});
      } else {
        resolve(response);
      }
    })
  });
}

module.exports = {
  listEmployees: listEmployees,
  getEmployee: getEmployee,
  listPositions: listPositions
};
