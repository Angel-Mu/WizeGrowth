const express = require('express');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();

const controller = require('../controllers/categories');

const router = express.Router();

router.route('/')
  .get(ensureLoggedIn, controller.list)
  .post(ensureLoggedIn, controller.create);

module.exports = router;
