// npm dependencies
const bcrypt                                = require('bcryptjs');
const _                                     = require('lodash');

// Internal dependencies[MODEL,SCHEMA and helper functions]
const messages                              = require('../utilities/static_messages');
const { User }                              = require('../models/users.models');
const { statusCode,PWD_ENCRYPTION_ROUNDS }  = require('../utilities/constants');
const { addUserSchema, updateUserSchema,
    iplTeamsSchema }                        = require('../utilities/schema');
const { handleResponse, validateInput,
    validateTeam }                          = require('../utilities/utils');

/**
 * @param     {object}  req     Request object from end user.
 * @param     {object}  res     Response object to be sent to end user.
 * @description         This method carries the buiseness logic of retrieving the data form database. 
 */
getUsers = async (req, res) => {
    // Getting all the documents from user collection.
    const result = await User.find();
    // Sending success response with required data.
    handleResponse(statusCode.SUCCESS, res, { userData: result.map(item => ({ name: item.name, email: item.email, isAdmin: item.isAdmin })) });
}

/**
 * @param     {object}  req     Request object from end user.
 * @param     {object}  res     Response object to be sent to end user.
 * @description         This method carries the buiseness logic of storing the data in database. 
 */
addUser = async (req, res) => {
    // Validates the user input data with schema.
    const { error } = validateInput(req.body, addUserSchema);
    // If data doesn't matches with schema, returns response to end user.
    if (error) return handleResponse(statusCode.BAD_REQUEST, res, { message: error.details[0].message });
    // Fetching the email details from request body and searching the documents.
    let user = await User.findOne({ email: req.body.email });
    // If email already exists, returns response to end user.
    if (user) return handleResponse(statusCode.CONFLICT, res, { message: messages.USER_CONFLICT_TEXT });
    // Creating the new user.
    user = new User(req.body);
    // Encrypting the password.
    const salt = await bcrypt.genSalt(PWD_ENCRYPTION_ROUNDS);
    user.password = await bcrypt.hash(user.password, salt);
    // Restricting admin access.
    user.isAdmin = false;
    // saving the data in database
    const response = await user.save();
    // Sending success response with required data.
    handleResponse(statusCode.SUCCESS, res, { message: messages.USER_ADDED_TEXT });
}

/**
 * @param     {object}  req     Request object from end user.
 * @param     {object}  res     Response object to be sent to end user.
 * @description         This method carries the buiseness logic of retrieving the data by req param form database. 
 */
getUserByName = async (req, res) => {
    // Getting the document based on the request param from user collection.
    let result = await User.findOne({ name: req.params.name }).select('-password');
    // If user doesn't exists, returns the response to end user.
    if (!result) return handleResponse(statusCode.UNPROCESSABLE_ENTITY, res, { message: messages.USER_NOT_FOUND_TEXT })
    // Sending success response with required data.
    handleResponse(statusCode.SUCCESS, res, { userDetails: _.pick(result, ['name', 'email', 'players']) });
}

/**
 * @param     {object}  req     Request object from end user.
 * @param     {object}  res     Response object to be sent to end user.
 * @description         This method carries the buiseness logic of retrieving the loggedin profile data form database. 
 */
getProfile = async (req, res) => {
    // Getting the document based on id from req token.
    let result = await User.findOne({ _id: req.user._id });
    // If user doesn't exists, returns the response to end user.
    if (!result) return handleResponse(statusCode.UNPROCESSABLE_ENTITY, res, { message: messages.USER_NOT_FOUND_TEXT })
    // Sending success response with required data.
    handleResponse(statusCode.SUCCESS, res, { userDetails: _.pick(result, ['name', 'email', 'team']) });
}

/**
 * @param     {object}  req     Request object from end user.
 * @param     {object}  res     Response object to be sent to end user.
 * @description         This method carries the buiseness logic of updating the data by req param form database. 
 */
updateUser = async (req, res) => {
    // Validates the user input data with schema.
    const { error } = validateInput(req.body, updateUserSchema);
    // If data doesn't matches with schema, returns response to end user.
    if (error) return handleResponse(statusCode.BAD_REQUEST, res, { message: error.details[0].message });
    // Fetching the email details from request body and searching the documents.
    let user = await User.findOne({ email: req.body.email });
    // If email doesn't exists, returns response to end user.
    if (!user) return handleResponse(statusCode.UNPROCESSABLE_ENTITY, res, { message: messages.USER_NOT_FOUND_TEXT });
    // Updating the user object with new data.
    Object.keys(req.body).forEach(item => {
        user[item] = req.body[item]
    })
    // saving the data in database
    await user.save();
    // Sending success response with required data.
    handleResponse(statusCode.SUCCESS, res, { userDetails: _.pick(user, ['name']), message: messages.USER_UPDATED_TEXT });
}

/**
 * @param     {object}  req     Request object from end user.
 * @param     {object}  res     Response object to be sent to end user.
 * @description         This method carries the buiseness logic of deleting the data by req param form database. 
 */
deleteUser = async (req, res) => {
    // Fetching and deleting the document based on the request param from user collection.
    let result = await User.findOneAndDelete({ email: req.params.email });
    // If user doesn't exists, returns the response to end user.
    if (!result) return handleResponse(statusCode.UNPROCESSABLE_ENTITY, res, { message: messages.USER_NOT_FOUND_TEXT });
    // Sending success response with required data.
    handleResponse(statusCode.SUCCESS, res, { message: messages.USER_DELETED_TEXT });
}

/**
 * @param     {object}  req     Request object from end user.
 * @param     {object}  res     Response object to be sent to end user.
 * @description         This method carries the buiseness logic of providing admin access to user. 
 */
giveAdminAccess = async (req, res) => {
    // Fetching the document based on the request param from user collection.
    let user = await User.findOne({ email: req.body.email });
    // If user doesn't exists, returns the response to end user.
    if(!user) return handleResponse(statusCode.UNPROCESSABLE_ENTITY, res, { message: messages.USER_NOT_FOUND_TEXT });
    // updating the admin field 
    user.isAdmin = true;
    // storing the value in database.
    await user.save();
    // Sending success response with required data.
    handleResponse(statusCode.SUCCESS, res, { message: messages.ADMIN_ACCESS_TEXT});
}

/**
 * @param     {object}  req     Request object from end user.
 * @param     {object}  res     Response object to be sent to end user.
 * @description         This method creates a team for the LOGGED IN user.
 */
createTeam = async (req, res) => {
    // Validates the user input data with schema.
    const { error } = validateInput(req.body, iplTeamsSchema);
    // If data doesn't matches with schema, returns response to end user.
    if (error) return handleResponse(statusCode.BAD_REQUEST, res, { message: error.details[0].message });
    // Validates the user input data with different conditions.
    const message = await validateTeam(req.body.players);
    // If data doesn't matches with schema, returns response to end user.
    if (message) return handleResponse(statusCode.BAD_REQUEST, res, { message: message });
    // Getting the logged in user data based on _id. 
    let user = await User.findOne({ _id: req.user._id });
    // Updating the user object.
    user.team = req.body;
    // saving the data in database
    await user.save();
    // Sending success response with required data.
    handleResponse(statusCode.SUCCESS, res, { user, message: messages.TEAM_ADDED_TEXT });
}

// Default export
module.exports = {
    addUser,
    getUsers,
    getUserByName,
    deleteUser,
    updateUser,
    createTeam,
    getProfile,
    giveAdminAccess
}