const mongoose = require('mongoose');
const { Schema } = mongoose;

const imageSchema = new Schema({
url: String,
alt: String,
caption: String,
});

const parkSchema = new Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  address: {type: String, required: true},
  phone: {type: String, required: false},
  hours: {type: Array, required: false},
  city: {type: String, required: true},
  state: {type: String, required: true},
  zip: {type: Number, required: true},
  images: [imageSchema],
  lat: {type: Number},
  long: {type: Number},
  shop: {type: Boolean, default: false},
  playground: {type: Boolean, default: false},
  hasTrails: {type: Boolean, default: false},
  water: {type: Boolean, default: false},
  allowsDogs: {type: Boolean, default: false},
  free: {type: Boolean, default: false},
  activities: {type: Array, required: true, default: []},
  
  
});

const Park = mongoose.model('Park', parkSchema);

module.exports = Park; 