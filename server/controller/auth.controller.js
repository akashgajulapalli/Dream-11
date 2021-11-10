// npm dependency
const bcrypt                                = require('bcryptjs');

// Internal dependencies[MODEL,SCHEMA and helper functions]
const messages                              = require('../utilities/static_messages');
const { User }                              = require('../models/users.models');
const { statusCode, PWD_ENCRYPTION_ROUNDS } = require('../utilities/constants');
const { loginUserSchema }                   = require('../utilities/schema');
const { handleResponse, validateInput }     = require('../utilities/utils');

/**
 * @param     {object}  req     Request object from end user.
 * @param     {object}  res     Response object to be sent to end user.
 * @description         This method carries the buiseness logic of checking user in database. 
 */
doLogin = async (req, res) => {
    // Validates the user input data with schema.
    const { error } = validateInput(req.body, loginUserSchema);
    // If data doesn't matches with schema, returns response to end user.
    if (error) return handleResponse(statusCode.BAD_REQUEST, res, { message: error.details[0].message });
    // Fetching the email details from request body and searching the documents.
    let user = await User.findOne({ email: req.body.email });
    // If email doesn't exists, returns response to end user.
    if (!user) return handleResponse(statusCode.UNPROCESSABLE_ENTITY, res, { message: messages.EMAIL_INVALID_TEXT });
    // Fetching the password details from request body and comparing the password.
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    // If password doesn't matches, returns response to end user.
    if (!validPassword) return handleResponse(statusCode.UNPROCESSABLE_ENTITY, res, { message: messages.PASSWORD_INVALID_TEXT });
    // Generating JWT based on loggedin user details(object). 
    const jwtToken = user.generateAuthToken(user);
    // Sending success response with required data.
    handleResponse(statusCode.SUCCESS, res, { token: jwtToken, message: messages.SUCCESSFULL_LOGIN_TEXT, isAdmin: user.isAdmin }, jwtToken);
};

resetPassword = async (req, res) => {
    // Validates the user input data with schema.
    const { error } = validateInput(req.body, loginUserSchema);
    // If data doesn't matches with schema, returns response to end user.
    if (error) return handleResponse(statusCode.BAD_REQUEST, res, { message: error.details[0].message });
    // Fetching the email details from request body and searching the documents.
    let user = await User.findOne({ email: req.body.email });
    // If email doesn't exists, returns response to end user.
    if (!user) return handleResponse(statusCode.UNPROCESSABLE_ENTITY, res, { message: messages.EMAIL_INVALID_TEXT });
    // Encrypting the password.
    const salt = await bcrypt.genSalt(PWD_ENCRYPTION_ROUNDS);
    user.password = await bcrypt.hash(req.body.password, salt);
    // saving the details.
    await user.save();
    // Sending success response with required data.
    handleResponse(statusCode.SUCCESS, res, { message: 'Password updated' });
}

// Default export
module.exports = { doLogin, resetPassword }; 