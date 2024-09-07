
const mongoose = require('mongoose');
const AvailabilitySchema = new mongoose.Schema({
  user: String,
  start: Date,
  end: Date,
  duration: Number,
});

module.exports = mongoose.model('Availability', AvailabilitySchema);




