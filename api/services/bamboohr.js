const request = require('request');

const bambooAPI = `https://${process.env.API_KEY}:x@api.bamboohr.com/api/gateway.php/${process.env.COMPANY_NAME}/v1`;

function listEmployees() {
  return new Promise(function (resolve, reject) {
    request.get({
      url: `${bambooAPI}/employees/directory`,
      json: true
    }, function (err, response) {
      if (err) {
        reject(err);
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
      if (err) {
        reject(err);
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
      if (err) {
        reject(err);
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
