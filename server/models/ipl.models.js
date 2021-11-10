// npm dependencies
const mongoose              = require('mongoose');
const { playersSchema }     = require('../models/player.models');
// Constant import
const { collectionName }    = require('../utilities/constants');

// Creating database schema for team
const iplSchema = new mongoose.Schema({
    teamName    : { type: String, required: true },
    players     : [playersSchema]
});

// Creating a collection in mongoDB database.
const Ipl = mongoose.model(collectionName.IPL_TEAMS, iplSchema);

// default exports
exports.Ipl         = Ipl;
exports.iplSchema   = iplSchema; 