const express = require('express');

const controller = require('../controllers/categories');

const router = express.Router();

router.route('/')
  .get(controller.list)
  .post(controller.create);

module.exports = router;
