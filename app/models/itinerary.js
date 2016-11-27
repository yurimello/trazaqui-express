const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true },
})

const PlaceSchema = new Schema({
  name: { type: String, required: true },
  items: { type: [ ItemSchema ], required: true },
});

const ItinerarySchema = new Schema({
  places: { type: [ PlaceSchema ], required: true },
})

module.exports = mongoose.model('Itinerary', ItinerarySchema);
