const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const imageSchema = new Schema({
url: String,
alt: String,
caption: String,
});

const commentSchema = new Schema({
username: String,
text: String,
createdOn: {type: Date, default: Date.now},
commentID: {type: Schema.Types.ObjectId, default: () => new Types.ObjectId()},

});

const parkSchema = new Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  address: {type: String, required: true},
  phone: {type: String, required: false},
  hours: {type: Array, required: false},
  city: {type: String, required: true},
  state: {type: String, required: true},
  zip: {type: String, required: false},
  images: [imageSchema],
  cost: {type: String, required: false},
  allowsDogs: {type: Boolean, default: false},
  activities: {type: Array, required: false, default: []},
  lat: {type: String},
  long: {type: String},
  parkType: {type: String, required: false},
  comments: [commentSchema],
  
});

const Park = mongoose.model('Park', parkSchema);

module.exports = Park; 