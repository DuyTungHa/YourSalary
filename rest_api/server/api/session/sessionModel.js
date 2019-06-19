var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SessionSchema = new Schema({
    title: {
        type: String,
        required: true
    }, 
    description: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    }, 
    freelancer: {type: Schema.Types.ObjectId, ref: 'user'}
});

module.exports = mongoose.model('session', SessionSchema);