// Table Schema of the database //
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PinSchema = new Schema({
  titleOfPin: String,
  description: String,
  username: String,
  path: String,
  isSave: String,
})

// Pin values in the mongoosedb //
module.exports = mongoose.model('Pin', PinSchema);