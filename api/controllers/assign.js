const Wizer = require('../models/wizers');

function assign(req, res) {
  Wizer.find({email: req.body.wizer.email})
    .then(function (wizers) {
      if (wizers.length) {
        Wizer.findByIdAndUpdate(wizers[0]._id, {$push: {stars: req.body.star}})
          .then(function (wizer) {
            res.status(200).json(wizer);
          })
          .catch(function (err) {
            res.status(500).json({message: err.message});
          });
      } else {
        let wizer = req.body.wizer;
        wizer.stars = [req.body.star];
        Wizer.create(wizer)
          .then(function (wizer) {
            res.status(201).json(wizer);
          })
          .catch(function (err) {
            res.status(500).json({message: err.message});
          });
      }
    });
}

module.exports = {
  assign: assign
};
