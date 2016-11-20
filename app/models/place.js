const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const PlaceSchema = new Schema({
  name: String
});
PlaceSchema.pre('save', function(next) {
  console.log('saving');
  next();
})
module.exports = mongoose.model('Place', PlaceSchema);
