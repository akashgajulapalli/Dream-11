// npm dependencies
const { Player }                          = require('../models/player.models');

// Internal dependencies[MODEL,SCHEMA and helper functions]
const { playerSchema }                    = require('../utilities/schema');
const { handleResponse, validateInput }   = require('../utilities/utils');
const messages                            = require('../utilities/static_messages');
const { statusCode }                      = require('../utilities/constants');

/**
 * @param     {object}  req     Request object from end user.
 * @param     {object}  res     Response object to be sent to end user.
 * @description         This method carries the buiseness logic of storing the role in database. 
 */
addPlayer = async (req, res) => {
    // Validates the user input data with schema.
    const { error } = validateInput(req.body, playerSchema);
    // If data doesn't matches with schema, returns response to end user.
    if (error) return handleResponse(statusCode.BAD_REQUEST, res, { message: error.details[0].message });
    // Fetching the role details from request body and searching the documents.
    let player = await Player.findOne({ name: req.body.name });
    // If email already exists, returns response to end user.
    if (player) return handleResponse(statusCode.CONFLICT, res, { message: messages.PLAYER_CONFLICT_TEXT });
    // Creating the new Role.
    player = new Player(req.body);
    // saving the data in database
    await player.save();
    // Sending success response with required data.
    handleResponse(statusCode.SUCCESS, res, { message: messages.PLAYER_ADDED_TEXT });
}

/**
 * @param     {object}  req     Request object from end user.
 * @param     {object}  res     Response object to be sent to end user.
 * @description         This method carries the buiseness logic of retrieving the roles form database. 
 */
getPlayers = async (req, res) => {
    // Getting all the documents from ROLE collection.
    const result = await Player.find();
    // Sending success response with required data.
    handleResponse(statusCode.SUCCESS, res, { playersList: result });
}

// default export
module.exports = { addPlayer, getPlayers };