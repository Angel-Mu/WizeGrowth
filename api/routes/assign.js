const express = require('express');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();

const controller = require('../controllers/assign');

const router = express.Router();

router.route('/')
  .post(ensureLoggedIn, controller.assign);

module.exports = router;
