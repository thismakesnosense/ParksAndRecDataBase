const mongoose = require('mongoose');
const { Schema } = mongoose;

const parkSchema = new Schema({
  name: {type: String, required: true},
  address: {type: String, required: true},
  city: {type: String, required: true},
  state: {type: String, required: true},
  zip: {type: Number, required: true},
  images: [{type: String}],
  lat: {type: Number},
  long: {type: Number},
  shop: {type: Boolean, default: false},
  playground: {type: Boolean, default: false},
  hasTrails: {type: Boolean, default: false},
  water: {type: Boolean, default: false},
  allowsFishing: {type: Boolean, default: false},
  allowsDogs: {type: Boolean, default: false},
  allowsBikes: {type: Boolean, default: false},
  allowsCamping: {type: Boolean, default: false},
  allowsRV: {type: Boolean, default: false},
  allowsBoats: {type: Boolean, default: false},
  allowsHorses: {type: Boolean, default: false},
  allowsHunting: {type: Boolean, default: false},
  allowsWaterSports: {type: Boolean, default: false},
  free: {type: Boolean, default: false},
  activities: {type: String, required: true},
  
  
});

const Park = mongoose.model('Park', parkSchema);

module.exports = Park; 