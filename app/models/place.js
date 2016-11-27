const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const ItemsSchema = new Schema({
  name: { type: String, required: true },
})

const PlaceSchema = new Schema({
  name: { type: String, required: true },
  items: [ ItemsSchema ],
});

module.exports = mongoose.model('Place', PlaceSchema);
