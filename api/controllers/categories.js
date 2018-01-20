const categories = require('../models/categories');

function list(req, res, next) {
  categories.find({}).then(function (categories) {
    res.json(categories);
  }).catch(function (err) {
    res.status(err.status).json({message: err.message});
  });
}

function create(req, res) {
  categories.create({
    name: req.body.name,
    description: req.body.description
  }).then(function (category) {
    res.json(category);
  }).catch(function (err) {
    res.status(err.status).json({message: err.message});
  });
}

module.exports = {
  list: list,
  create: create
};
