var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    googleId: {
        type: Number,
        required: true, 
        unique: true
    }, 
    profession: {
        type: String,
        required: true,
        default: 'Your Job'
    }, 
    sumSalary: {
        type: Number,
        required: true,
        default: 0
    },
    currency: {
        type: String,
        required: true,
        default: 'USD'
    }
});

UserSchema.methods = {
    toJson: function() {
        var obj = this.toObject();
        delete obj.googleId;
        return obj;
    }
}

module.exports = mongoose.model('user', UserSchema);