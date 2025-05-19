const mongoose = require('mongoose');
const { type } = require('os');

const userSchema = new mongoose.Schema({
    userId: {
        type: Number,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    addDate: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('User', userSchema);