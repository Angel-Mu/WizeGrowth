const express = require('express');

const controller = require('../controllers/assign');

const router = express.Router();

router.route('/')
  .post(controller.assign);

module.exports = router;
