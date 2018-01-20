const express = require('express');
const passport = require('passport');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
const controller = require('../controllers/users');

const router = express.Router();

router.route('/')
  .get(ensureLoggedIn, controller.list);

router.route('/:id')
  .get(ensureLoggedIn, controller.get);

module.exports = router;
