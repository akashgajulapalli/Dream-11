// npm dependency
const express                           = require('express');

// Middleware imports
const { authentication, authorization } = require('../middleware/middleware');

// function imports
const {
    addTeam,
    getAllTeams,
    getPlayersByTeams,
    getPlayerDetails }                  = require('../controller/ipl.controller');
const router                            = express.Router();

/**
 * Adding the functionality of route based on the route path.
 * Authentication and Authorization has to happen before going to functionality.
 */
router.route('/')
    .get([authentication, authorization], getAllTeams)
    .post([authentication, authorization], addTeam);

router.route('/players/:name')
    .get([authentication, authorization], getPlayerDetails)

router.route('/teams/:name')
    .get([authentication, authorization], getPlayersByTeams);

// Default export
module.exports = router;