const express = require('express');

const controller = require('../controllers/stars');

const router = express.Router();

router.route('/')
  .get(controller.list)
  .post(controller.create);

module.exports = router;
