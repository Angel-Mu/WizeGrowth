const express = require('express');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();

const controller = require('../controllers/jobs');

const router = express.Router();

router.route('/')
  .get(ensureLoggedIn, controller.list);

module.exports = router;
