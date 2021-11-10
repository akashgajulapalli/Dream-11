// npm dependency
const express                          = require('express');

// function imports
const { doLogin, resetPassword }       = require('../controller/auth.controller');
const router                           = express.Router();

// Setting up the functionality for route
router.route('/login').post(doLogin);
router.route('/resetPassword').post(resetPassword);

// Default export
module.exports = router;