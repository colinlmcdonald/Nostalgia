const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  access_token: String,
  refresh_token: String,
  id: String,
  birthday: Object
});

const User = mongoose.model('User', UserSchema);

module.exports = User;