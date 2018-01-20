const bamboohr = require('../services/bamboohr');
const Reward = require('../models/rewards');
const Star = require('../models/stars');

function userHasStar(user, star) {
  return new Promise(function (resolve, reject) {
    Reward.find({user: user, star: star})
      .then(function (rewards) {
        resolve(rewards);
      })
      .catch(function (err) {
        reject(err);
      });
  });
}

function assign(req, res) {
  Star.findById(req.body.star)
    .then(function (star) {
      if (star) {
        bamboohr.getEmployee(req.body.user)
          .then(function (response) {
            userHasStar(req.body.user, req.body.star)
              .then(function (rewards) {
                if (rewards.length) {
                  res.status(400).json({message: `User "${response.body.displayName}" already has "${star.caption}" star.`});
                } else {
                  Reward.create({user: req.body.user, star: star})
                    .then(function (reward) {
                      res.status(201).json(reward);
                    })
                    .catch(function (err) {
                      res.status(500).json({message: err.message});
                    });
                }
              })
              .catch(function (err) {
                res.status(500).json({message: err.message});
              });
          })
          .catch(function (err) {
            res.status(err.status).json({message: err.message});
          });
      } else {
        res.status(400).json({message: `Star "${req.body.star}" does not exist.`});
      }
    })
    .catch(function (err) {
      res.status(500).json({message: err.message});
    });
}

module.exports = {
  assign: assign
};
