const bamboohr = require('../services/bamboohr');

function list(req, res) {
  bamboohr.listEmployees().then(function (response) {
    res.json(response.body.employees);
  }).catch(function (err) {
    res.status(err.status).json({message: err.message});
  });
}

function get(req, res) {
  bamboohr.getEmployee(req.params.id).then(function (response) {
    res.json(response.body);
  }).catch(function (err) {
    res.status(err.status).json({message: err.message});
  });
}

module.exports = {
  list: list,
  get: get
};
