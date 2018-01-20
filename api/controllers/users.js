const bamboohr = require('../services/bamboohr');

function list(req, res) {
  bamboohr.listEmployees().then(function (response) {
    res.write(JSON.stringify(response.body.employees));
    res.status(200).end();
  }).catch(function (err) {
    res.write({message: err.message});
    res.status(500).end();
  });
}

function get(req, res) {
  bamboohr.getEmployee(req.params.id).then(function (response) {
    res.write(JSON.stringify(response.body));
    res.status(200).end();
  }).catch(function (err) {
    res.write({message: err.message});
    res.status(500).end();
  });
}

module.exports = {
  list: list,
  get: get
};
