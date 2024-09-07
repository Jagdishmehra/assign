
const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  start: Date,
  end: Date,
  participants: [
    {
      name: String,
      email: String,
    }
  ],
  isOneOnOne: Boolean, 
});

module.exports = mongoose.model('Session', sessionSchema);
