const bamboohr = require('../services/bamboohr');

function list(req, res) {
  bamboohr.listPositions().then(function (response) {
    res.json(response.body.options);
  }).catch(function (err) {
    res.status(err.status).json({message: err.message});
  });
}

module.exports = {
  list: list
};
