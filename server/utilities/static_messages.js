/**
 * @description     This module contains all the static messages
 */
const messages = {
    FATAL_ERROR_TEXT                : 'FATAL ERROR: jwtPrivateKey is not defined.',
    DBCONNECTION_SUCCESS_TEXT       : 'Connected to mongodb...',
    DBCONNECTION_FAILURE_TEXT       : 'Connection failed..',
    TOKEN_REQUIRED_TEXT             : 'Token is required',
    TOKEN_INVALID_TEXT              : 'Invalid token',
    EMAIL_INVALID_TEXT              : 'Invalid email',
    PASSWORD_INVALID_TEXT           : 'Invalid password',
    SUCCESSFULL_LOGIN_TEXT          : 'User logged in successfully',
    URL_ACCESS_TEXT                 : "can't access this url",
    AUTHENTICATION_TEXT             : 'authentication error',
    AUTHORIZATION_TEXT              : 'authorization error',
    USER_CONFLICT_TEXT              : 'User already registered',
    USER_NOT_FOUND_TEXT             : 'User not found',
    USER_ADDED_TEXT                 : 'User registration successfull',
    USER_UPDATED_TEXT               : 'User details updated successfully',
    USER_DELETED_TEXT               : 'User details deleted successfully',
    ROLE_ADDED_TEXT                 : 'Role added successfully',
    ROLE_CONFLICT_TEXT              : 'Role already exists',
    COUNTRY_ADDED_TEXT              : 'Country added successfully',
    COUNTRY_CONFLICT_TEXT           : 'Country already exists',
    PLAYER_ADDED_TEXT               : 'Player added successfully',
    PLAYER_CONFLICT_TEXT            : 'Player already exists',
    TEAM_ADDED_TEXT                 : 'Team added successfully',
    TEAM_UPDATED_TEXT               : 'Team updated successfully',
    PLAYERS_REQUIRED_TEXT           : 'Please add atleast one player details',
    TEAM_NOT_FOUND_TEXT             : 'Team not exists',
    ADMIN_ACCESS_TEXT               : 'Admin access provided successfully'
}

module.exports = messages