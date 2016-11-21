const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const PlaceSchema = new Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model('Place', PlaceSchema);
