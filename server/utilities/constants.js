/**
 * @description     This module contains all the config constants.
 */
module.exports = {
    dataValidationConstants: {
        USER: {
            NAME            : { MIN_LENGTH: 5, MAX_LENGTH: 50 },
            EMAIL           : { MIN_LENGTH: 5, MAX_LENGTH: 250 },
            PASSWORD        : { MIN_LENGTH: 5, MAX_LENGTH: 500 }
        },

        TEAM:{
            LENGTH              : 11,
            BATSMAN_COUNT       : 4,
            WK_COUNT            : 1,
            ALL_ROUNDER_COUNT   : 3,
            BOWLER_COUNT        : 3,
            RATING_POINTS       : 100
        },

        ROLES: {
            BATSMAN             : 1,
            BATTING_ALLROUNDER  : 2,
            WICKET_KEEPER       : 3,
            BOWLING_ALLROUNDER  : 4,
            BOWLER              : 5
        }

    },

    contentType: {
        JSON                : { "Content-Type": "application/json" },
        HTML                : { "Content-Type": "text/html" },
    },

    statusCode: {
        SUCCESS             : 200, // SUCCESS
        BAD_REQUEST         : 400, // INVALID DATA IN REQUEST
        UNAUTHORIZED        : 401, // ABSENCE OF TOKEN IN REQ HEADER
        FORBIDDEN           : 403, // TOKEN EXISTS, BUT INVALID[EXPIRED]
        CONFLICT            : 409, // REQUEST DATA ALREADY EXISTS IN DB
        UNPROCESSABLE_ENTITY: 422, // REQUEST DATA NOT FOUND IN DB
        SERVER_ERROR        : 500  // INTERNAL SERVER ERROR
    },

    exitCode: {
        FATAL_EXCEPTION     : 1
    },

    jwtConstants: {
        TOKEN_TIMEOUT       : 3600 // [expires for every one hour]
    },

    serverConfig: {
        PORT                : 8080
    },

    PWD_ENCRYPTION_ROUNDS   : 10,

    routes: {
        BASE_URL            : '/api',
        AUTH                : '/auth',
        USERS               : '/users',
        IPL                 : '/iplTeams',
        ROLES               : '/roles',
        PLAYERS             : '/players',
        COUNTRIES           : '/countries'
    },

    collectionName: {
        USER                : 'User',
        IPL_TEAMS           : 'Iplteams',
        ROLES               : 'Roles',
        PLAYERS             : 'Players',
        COUNTRIES           : 'Countries'
    },

    userRoles : {
        ADMIN               : 'admin',
        USER                : 'user'
    }
}