const express = require('express');

const controller = require('../controllers/dashboard');

const router = express.Router();

router.route('/topTen')
  .get(controller.topTen);

module.exports = router;
