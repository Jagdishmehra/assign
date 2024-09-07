
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  notificationPreferences: {
    email: Boolean,
    sms: Boolean,
  },
});

module.exports = mongoose.model('User', userSchema);
