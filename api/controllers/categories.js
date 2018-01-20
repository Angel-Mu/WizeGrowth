const categories = require('../models/categories');

function searchByName(name) {
  return new Promise(function (resolve, reject) {
    categories.find({name: {$regex: name, $options: 'i'}})
      .then(function (stars) {
        resolve(stars);
      })
      .catch(function (err) {
        reject(err);
      });
  });
}

function list(req, res) {
  categories.find().then(function (categories) {
    res.json(categories);
  }).catch(function (err) {
    res.status(err.status).json({message: err.message});
  });
}

function create(req, res) {
  if (!req.body.name) {
    res.status(400).json({message: 'Name cannot be empty.'});
  } else {
    searchByName(req.body.name).then(function (stars) {
      console.log(stars)
      if (stars.length) {
        res.status(400).json({message: `Category "${req.body.name}" already exists.`});
      } else {
        categories.create({
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
