// npm dependency
const express                           = require('express');

// Middleware imports
const { authentication, authorization } = require('../middleware/middleware');

// function imports
const {
    addUser,
    getUsers,
    getUserByName,
    deleteUser,
    updateUser,
    createTeam,
    getProfile,
    giveAdminAccess }                   = require('../controller/users.controller');
const router                            = express.Router();

/**
 * Adding the functionality of route based on the route path.
 * Authentication and Authorization has to happen before going to functionality.
 */
router.route('/').get([authentication, authorization], getUsers);
router.route('/').put([authentication, authorization], updateUser);
router.route('/me').get([authentication, authorization], getProfile);
router.route('/register').post(addUser);
router.route('/:name').get([authentication, authorization], getUserByName);
router.route('/:email').delete([authentication, authorization], deleteUser);
router.route('/createTeam').post([authentication, authorization], createTeam);
router.route('/adminAccess').post([authentication, authorization], giveAdminAccess);

// Default export
module.exports = router;