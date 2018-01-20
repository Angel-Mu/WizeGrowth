const bamboohr = require('../services/bamboohr');
const Wizer = require('../models/wizers');

function list(req, res) {
  bamboohr.listEmployees().then(function (response) {
    res.json(response.body.employees);
  }).catch(function (err) {
    res.status(err.status).json({message: err.message});
  });
}

function get(req, res) {
  bamboohr.getEmployee(req.params.id).then(function (response) {
    Wizer.find({email: response.body.workEmail})
      .then(function (wizers) {
        if (wizers.length > 0) {
          res.json(Object.assign(response.body, wizers[0]));
        } else {
          res.json(response.body);
        }
      })
      .catch(function (err) {
        res.status(err.status).json({message: err.message});
      });
  }).catch(function (err) {
    res.status(err.status).json({message: err.message});
  });
}

module.exports = {
  list: list,
  get: get
};
