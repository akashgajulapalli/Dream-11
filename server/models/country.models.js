// npm dependencies
const mongoose              = require('mongoose');

// Constant import
const { collectionName }    = require('../utilities/constants');

// Creating database schema
const countrySchema = new mongoose.Schema({
    key         : { type: Number, required: true },
    value       : { type: String, required: true },
})

// Creating a collection in mongoDB database.
const Country = mongoose.model(collectionName.COUNTRIES, countrySchema);

// Default export
exports.Country = Country;