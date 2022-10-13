const mongoose = require('mongoose');

const peopleSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('People', peopleSchema);