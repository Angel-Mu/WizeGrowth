const Category = require('../models/categories');
const Star = require('../models/stars');

const bamboohr = require('../services/bamboohr');

function searchByName(name) {
  return new Promise(function (resolve, reject) {
    Star.find({name: {$regex: name, $options: 'i'}})
      .then(function (stars) {
        resolve(stars);
      })
      .catch(function (err) {
        reject(err);
      });
  });
}

function list(req, res) {
  Star.find().then(function (stars) {
    res.json(stars);
  }).catch(function (err) {
    res.status(err.status).json({message: err.message});
  });
}

function create(req, res) {
  if (!req.body.caption || !req.body.rate || !req.body.jobs || !req.body.jobs.length || !req.body.category) {
    res.status(400).json({message: 'Name, rate, jobs or category is empty.'});
  } else if(['BRONZE', 'SILVER', 'GOLD'].indexOf(req.body.rate) < 0) {
    res.status(400).json({message: 'Rate is not "BRONZE", "SILVER" or "GOLD".'});
  } else {
    Category.findById(req.body.category)
      .then(function (category) {
        if (category) {
          searchByName(req.body.caption)
            .then(function (stars) {
              if (stars.length) {
                res.status(400).json({message: `Star "${req.body.caption}" already exists.`});
              } else {
                bamboohr.listPositions()
                  .then(function (response) {
                    let valid = true;
                    let positions = response.body.options.map(function (position) {
                      return position.id;
                    });

                    req.body.jobs.forEach(function (jobId) {
                      if (positions.indexOf(jobId) < 0) {
                        valid = false;
                      }
                    });

                    if (valid) {
                      Star.create(req.body).then(function (star) {
                        res.json(star);
                      }).catch(function (err) {
                        res.status(err.status).json({message: err.message});
                      });
                    } else {
                      res.status(400).json({message: 'Job nonexistent'});
                    }
                  })
                  .catch(function (err) {
                    res.status(err.status).json({message: err.message});
                  });
              }
            })
            .catch(function (err) {
              res.status(500).json({message: err.message})
            });
        } else {
          res.status(400).json({message: `Category "${req.body.category}" nonexistent.`});
        }
      })
      .catch(function (err) {
        res.status(500).json({message: err.message});
      });
  }
}

module.exports = {
  list: list,
  create: create
};
