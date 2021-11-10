// Internal dependencies[MODEL,SCHEMA and helper functions]
const { Ipl }                           = require('../models/ipl.models');
const { iplTeamsSchema }                = require('../utilities/schema');
const messages                          = require('../utilities/static_messages');
const { statusCode }                    = require('../utilities/constants');
const { handleResponse, validateInput } = require('../utilities/utils');

/**
 * @param     {object}  req     Request object from end user.
 * @param     {object}  res     Response object to be sent to end user.
 * @description         This method carries the buiseness logic of storing the team data to user. 
 */
addTeam = async (req, res) => {
    // Validates the user input data with schema.
    const { error } = validateInput(req.body, iplTeamsSchema);
    // If data doesn't matches with schema, returns response to end user.
    if (error) return handleResponse(statusCode.BAD_REQUEST, res, { message: error.details[0].message });
    // Fetching the team details from request body and searching the documents.
    let team = await Ipl.findOne({ teamName: req.body.teamName });
    // If team exists
    if (team) {
        // If players in request body exists.
        if (req.body.players.length) {
            // Updating the Team details in user profile.
            const response = await team.update({ $push: { "players": req.body.players } });
            // Sending success response with required data.
            handleResponse(statusCode.SUCCESS, res, { message: messages.TEAM_UPDATED_TEXT });
        } else {
            // Sending error response with required data.
            handleResponse(statusCode.BAD_REQUEST, res, { message: messages.PLAYERS_REQUIRED_TEXT });
        }
    }
    // If team doesnt exists in user profile
    else {
        // Creating the team details in user profile.
        team = new Ipl(req.body);
        // Saving the details in db.
        const response = await team.save();
        // Sending success response with required data.
        handleResponse(statusCode.SUCCESS, res, { teamDetails: response, message: messages.TEAM_ADDED_TEXT });
    }
}

/**
 * @param     {object}  req     Request object from end user.
 * @param     {object}  res     Response object to be sent to end user.
 * @description         This method carries the buiseness logic of retrieving the teams data form database. 
 */
getAllTeams = async (req, res) => {
    // Gets all the teams from db.
    const result = await Ipl.find();
    // Sending success response with required data.
    handleResponse(statusCode.SUCCESS, res, { teamDetails: result })
}

/**
 * @param     {object}  req     Request object from end user.
 * @param     {object}  res     Response object to be sent to end user.
 * @description         This method carries the buiseness logic of retrieving the team details form database. 
 */
getPlayersByTeams = async (req, res) => {
    // Gets the team details based on request param.
    const result = await Ipl.findOne({ teamName: req.params.name });
    // If user doesn't exists, returns the response to end user.
    if (!result) return handleResponse(statusCode.UNPROCESSABLE_ENTITY, res, { message: messages.TEAM_NOT_FOUND_TEXT })
    // Sending success response with required data.
    handleResponse(statusCode.SUCCESS, res, { userDetails: result });
}

/**
 * @param     {object}  req     Request object from end user.
 * @param     {object}  res     Response object to be sent to end user.
 * @description         This method carries the buiseness logic of retrieving the player details form database. 
 */
getPlayerDetails = async (req, res) => {
    // Gets all the teams from db.
    const teamDetails = await Ipl.find();
    teamDetails.forEach(team => {
        team.players.forEach(player => {
            // checks the condition
            if (req.params.name === player.name) {
                const result = {
                    teamName: team.teamName,
                    details: player
                }
                // Sending success response with required data.
                handleResponse(statusCode.SUCCESS, res, { playerDetails: result });
            }
        })
    })
}

// Default export
module.exports = {
    addTeam, getAllTeams, getPlayersByTeams, getPlayerDetails
}