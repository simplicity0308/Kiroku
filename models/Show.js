// Mongo DB model for Show
const mongoose = require('mongoose');
const { type } = require('os');

const showSchema = new mongoose.Schema({
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
  }
});

module.exports = mongoose.model('Show', showSchema);

