// npm dependencies
const { Country }                          = require('../models/country.models');

// Internal dependencies[MODEL,SCHEMA and helper functions]
const { countrySchema }                    = require('../utilities/schema');
const { handleResponse, validateInput }    = require('../utilities/utils');
const messages                             = require('../utilities/static_messages');
const { statusCode }                       = require('../utilities/constants');

/**
 * @param     {object}  req     Request object from end user.
 * @param     {object}  res     Response object to be sent to end user.
 * @description         This method carries the buiseness logic of storing the country in database. 
 */
addCountry = async (req, res) => {
    // Validates the user input data with schema.
    const { error } = validateInput(req.body, countrySchema);
    // If data doesn't matches with schema, returns response to end user.
    if (error) return handleResponse(statusCode.BAD_REQUEST, res, { message: error.details[0].message });
    // Fetching the country details from request body and searching the documents.
    let country = await Country.findOne({ value: req.body.value });
    // If country already exists, returns response to end user.
    if (country) return handleResponse(statusCode.CONFLICT, res, { message: messages.COUNTRY_CONFLICT_TEXT });
    // Creating the new country.
    country = new Country(req.body);
    // saving the data in database
    const response = await country.save();
    // Sending success response with required data.
    handleResponse(statusCode.SUCCESS, res, { countryDetails: response, message: messages.COUNTRY_ADDED_TEXT });
}

/**
 * @param     {object}  req     Request object from end user.
 * @param     {object}  res     Response object to be sent to end user.
 * @description         This method carries the buiseness logic of retrieving the roles form database. 
 */
getCountries = async (req, res) => {
    // Getting all the documents from country collection.
    const result = await Country.find();
    // Sending success response with required data.
    handleResponse(statusCode.SUCCESS, res, { countriesList: result.map(item => ({ key: item.key, value: item.value })) });
}

// default export
module.exports = { addCountry, getCountries };