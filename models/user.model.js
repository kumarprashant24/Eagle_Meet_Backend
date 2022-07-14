const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  provider: String,
  picture_url: String,    

 
});

module.exports = mongoose.model('user', userSchema);