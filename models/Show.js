// Mongo DB model for Show
const mongoose = require('mongoose');
const { type } = require('os');

const showSchema = new mongoose.Schema({
  user_id:{
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  id: {
    type: Number,
    unique: true
  },
  episode: {
    type: Number,
    default: 0,
    min: [0, 'Episode count cannot be negative']
  },
  status: {
    type: String,
    enum: ['watching', 'completed', 'on hold', 'dropped', 'plan to watch'],
    default: 'plan to watch',
  },
  notes: {
    type: String,
    default: '',
  },
  addDate: {
    type: Date,
    default: Date.now,
  },
  season: {
    type: Number,
    default: 0,
    min: [0, 'Season number must not be negative']
  }
});

module.exports = mongoose.model('Show', showSchema);

