// npm dependencies
const { Role }                          = require('../models/role.models');

// Internal dependencies[MODEL,SCHEMA and helper functions]
const { roleSchema }                    = require('../utilities/schema');
const { handleResponse, validateInput } = require('../utilities/utils');
const messages                          = require('../utilities/static_messages');
const { statusCode }                    = require('../utilities/constants');

/**
 * @param     {object}  req     Request object from end user.
 * @param     {object}  res     Response object to be sent to end user.
 * @description         This method carries the buiseness logic of storing the role in database. 
 */
addRole = async (req, res) => {
    // Validates the user input data with schema.
    const { error } = validateInput(req.body, roleSchema);
    // If data doesn't matches with schema, returns response to end user.
    if (error) return handleResponse(statusCode.BAD_REQUEST, res, { message: error.details[0].message });
    // Fetching the role details from request body and searching the documents.
    let role = await Role.findOne({ value: req.body.value });
    // If role already exists, returns response to end user.
    if (role) return handleResponse(statusCode.CONFLICT, res, { message: messages.ROLE_CONFLICT_TEXT });
    // Creating the new Role.
    role = new Role(req.body);
    // saving the data in database
    const response = await role.save();
    // Sending success response with required data.
    handleResponse(statusCode.SUCCESS, res, { userDetails: response, message: messages.ROLE_ADDED_TEXT });
}

/**
 * @param     {object}  req     Request object from end user.
 * @param     {object}  res     Response object to be sent to end user.
 * @description         This method carries the buiseness logic of retrieving the roles form database. 
 */
getRoles = async (req, res) => {
    // Getting all the documents from ROLE collection.
    const result = await Role.find();
    // Sending success response with required data.
    handleResponse(statusCode.SUCCESS, res, { rolesList: result.map(item => ({ key: item.key, value: item.value })) });
}

// default export
module.exports = { addRole, getRoles };