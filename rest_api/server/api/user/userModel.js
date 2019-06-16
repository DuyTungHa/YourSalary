var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    googleId: {
        type: Number,
        required: true, 
        unique: true
    }
});

module.exports = mongoose.model('user', UserSchema);