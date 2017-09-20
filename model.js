let mongoose = require('mongoose');

let users = mongoose.Schema({
name:String,
password: String
});

let users = module.exports = mongoose.model('Users', users);
