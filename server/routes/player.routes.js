// npm dependency
const express                           = require('express');

// Middleware imports
const { authentication, authorization } = require('../middleware/middleware');

// function imports
const { addPlayer, getPlayers }         = require('../controller/player.controller');

const router                            = express.Router();

router.route('/')
    .get([authentication, authorization], getPlayers)
    .post([authentication, authorization], addPlayer);

//default export
module.exports = router;