// npm dependencies
const mongoose              = require('mongoose');

// Constant import
const { collectionName }    = require('../utilities/constants');

// Creating database schema
const roleSchema = new mongoose.Schema({
    key         : { type: Number, required: true },
    value       : { type: String, required: true },
})

// Creating a collection in mongoDB database.
const Role = mongoose.model(collectionName.ROLES, roleSchema);

// Default export
exports.Role = Role;