// npm dependencies
const mongoose              = require('mongoose');

// Constant import
const { collectionName }    = require('../utilities/constants');

// Creating database schema for players
const playersSchema = new mongoose.Schema({
    name        : { type: String, required: true },
    countryName : { type: String, required: true },
    age         : { type: Number, required: true },
    role        : { type: String, required: true },
    rating      : { type: Number, required: true }
});

// Creating a collection in mongoDB database.
const Player = mongoose.model(collectionName.PLAYERS, playersSchema);

// Default export
exports.Player          = Player;
exports.playersSchema   = playersSchema; 