const Wizer = require('../models/wizers');

function topTen(req, res) {
  Wizer.find().limit(10)
    .then(function (wizers) {
      res.json(wizers);
    })
    .catch(function (err) {
      res.status(500).json({message: err.message});
    })
}

module.exports = {
  topTen: topTen
};
