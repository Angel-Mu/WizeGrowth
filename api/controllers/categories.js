const Category = require('../models/categories');

function list(req, res) {
  Category.find().then(function (categories) {
    res.json(categories);
  }).catch(function (err) {
    res.status(err.status).json({message: err.message});
  });
}

function create(req, res) {
  if (!req.body.name) {
    res.status(400).json({message: 'Name cannot be empty.'});
  } else {
    searchByName(req.body.name).then(function (categories) {
      if (categories.length) {
        res.status(400).json({message: `Category "${req.body.name}" already exists.`});
      } else {
        Category.create({
          name: req.body.name,
          description: req.body.description
        }).then(function (category) {
          res.json(category);
        }).catch(function (err) {
          res.status(err.status).json({message: err.message});
        });
      }
    }).catch(function (err) {
      res.status(500).json({message: err.message})
    });
  }
}

module.exports = {
  list: list,
  create: create
};
