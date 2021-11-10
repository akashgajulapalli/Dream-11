// npm dependencies
const express       = require('express');

// Routes import
const auth          = require('../routes/auth.routes');
const users         = require('../routes/users.routes');
const ipl           = require('../routes/ipl.routes');
const roles         = require('../routes/role.routes');
const players       = require('../routes/player.routes');
const countries     = require('../routes/country.routes');

// constant import
const { routes }    = require('../utilities/constants');
const router        = express.Router();

// Giving the route paths
router.use(routes.AUTH      , auth);
router.use(routes.USERS     , users);
router.use(routes.IPL       , ipl);
router.use(routes.ROLES     , roles);
router.use(routes.PLAYERS   , players);
router.use(routes.COUNTRIES , countries)

// default export
module.exports = router; 