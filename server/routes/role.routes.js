// npm dependency
const express                           = require('express');

// Middleware imports
const { authentication, authorization } = require('../middleware/middleware');

// function imports
const { addRole, getRoles }             = require('../controller/role.controller');

const router                            = express.Router();

router.route('/')
    .get([authentication, authorization], getRoles)
    .post([authentication, authorization], addRole);

//default export
module.exports = router;