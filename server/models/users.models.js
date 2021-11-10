// npm dependencies
const mongoose                          = require('mongoose');
const config                            = require('config');
const jwt                               = require('jsonwebtoken');
const { iplSchema }                     = require('./ipl.models');

// Constant import
const { collectionName, jwtConstants }  = require('../utilities/constants');

// Creating database schema for users
const userSchema = new mongoose.Schema({
    name        : { type: String, required: true },
    email       : { type: String, required: true, unique: true },
    password    : { type: String, required: true },
    team        : [ iplSchema ],
    isAdmin     : Boolean
});

/**
 * @param   {object}  user    user object. 
 * @description       This method generates the token used for authentication.
 * @returns           token
 */
userSchema.methods.generateAuthToken = (user) => {
    // _id and isAdmin details are storing in token along with private key and setting the token expiry time[expiry time is in sec].
    const token = jwt.sign(
        { _id: user._id, isAdmin: user.isAdmin },
        config.get('jwtPrivateKey'),
        { expiresIn: jwtConstants.TOKEN_TIMEOUT }
    );
    return token;
}

// Creating a collection in mongoDB database.
const User = mongoose.model(collectionName.USER, userSchema);

// Default export.
exports.User = User;