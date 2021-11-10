// npm dependency
const Joi                                      = require('joi');

// constant imports
const { contentType, dataValidationConstants } = require('./constants');

/**
 * @param   {object}  inputData    Data entered by end user.
 * @param   {object}  schema       Schema to validate the inputData.
 * @description       This method validates the data with schema.
 * @returns           An object with error, if input data doesnt match with the schema.
 */
validateInput = (inputData, schema) => {
    return Joi.validate(inputData, schema);
}

/**
 * @param   {number}  status_code   Http status code.
 * @param   {object}  response      Api response.
 * @param   {object}  payload       Data to be sent to end user.
 * @param   {string}  token         Token for authentication.
 * @description       This method sends response to client with all the input params
 */
handleResponse = (status_code, response, payload, ...token) => {
    response.header("token", token);
    response.writeHead(status_code, contentType.JSON);
    response.write(JSON.stringify(payload));
    response.end();
}

/**
 * @param   {Array}  inputArray  Data for validation.
 * @returns {string} Validation message.
 * @description      This method validates the input array data.
 */
validateTeam = (inputArray) => {
    let message = ''
    const team = inputArray;
    // Checks for team length.
    if (team.length !== dataValidationConstants.TEAM.LENGTH) {
        message = `Team length should be ${dataValidationConstants.TEAM.LENGTH}`;
        return message;
    } else {
        // variable initializations.
        let ratingPoints = 0;
        let batsmanCount = 0;
        let wkCount = 0;
        let allRounderCount = 0;
        let bowlerCount = 0;
        // Updating the initialized variables based on conditions.
        team.forEach(player => {
            if (player.role === dataValidationConstants.ROLES.BATSMAN) {
                batsmanCount = batsmanCount + 1;
            } else if (player.role === dataValidationConstants.ROLES.WICKET_KEEPER) {
                wkCount = wkCount + 1;
            } else if (player.role === dataValidationConstants.ROLES.BATTING_ALLROUNDER || player.role === dataValidationConstants.ROLES.BOWLING_ALLROUNDER) {
                allRounderCount = allRounderCount + 1;
            } else if (player.role === dataValidationConstants.ROLES.BOWLER) {
                bowlerCount = bowlerCount + 1;
            }
            ratingPoints = ratingPoints + player.rating;
        });
        // Returning appropriate message.  
        if (ratingPoints > dataValidationConstants.TEAM.RATING_POINTS) {
            message = `Rating points should not exceed ${dataValidationConstants.TEAM.RATING_POINTS}`;
            return message;
        } else if (batsmanCount > dataValidationConstants.TEAM.BATSMAN_COUNT) {
            message = `Batsmans should not exceed ${dataValidationConstants.TEAM.BATSMAN_COUNT}`;
            return message;
        } else if (wkCount > dataValidationConstants.TEAM.WK_COUNT) {
            message = `Wicket keepers should not exceed ${dataValidationConstants.TEAM.WK_COUNT}`;
            return message;
        } else if (allRounderCount > dataValidationConstants.TEAM.ALL_ROUNDER_COUNT) {
            message = `All rounders should not exceed ${dataValidationConstants.TEAM.ALL_ROUNDER_COUNT}`;
            return message;
        } else if (bowlerCount > dataValidationConstants.TEAM.BOWLER_COUNT) {
            message = `Bowlers should not exceed ${dataValidationConstants.TEAM.BOWLER_COUNT}`;
            return message;
        }
    }
}

//Default export
module.exports = { validateInput, handleResponse, validateTeam };