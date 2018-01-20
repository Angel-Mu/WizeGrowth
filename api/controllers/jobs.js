const bamboohr = require('../services/bamboohr');

function list(req, res) {
  bamboohr.listPositions().then(function (response) {
    res.write(JSON.stringify(response.body.options));
    res.status(200).end();
  }).catch(function (err) {
    res.write({message: err.message});
    res.status(500).end();
  });
}

module.exports = {
  list: list
};
