// npm dependency
const express                           = require('express');

// Middleware imports
const { authentication, authorization } = require('../middleware/middleware');

// function imports
const { addCountry, getCountries }      = require('../controller/country.controller');

const router                            = express.Router();

router.route('/')
    .get([authentication, authorization], getCountries)
    .post([authentication, authorization], addCountry);

//default export
module.exports = router;