
//https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//crate schema 
var userSchema = new Schema({
    username: String,
    googleId: String
});
//compil model for schema
var User = mongoose.model('user', userSchema);

module.exports = User; 