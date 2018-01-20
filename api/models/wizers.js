const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const starsSchema = new Schema({
  caption: {type: String},
  description: {type: String},
  requirements: {type: String},
  rate: {type: String, enum: ['BRONZE', 'SILVER', 'GOLD']},
  image: {type: String},
  jobs: [Number],
  category: {type: ObjectId, ref: 'categories'},
  received_date: {type: Date},
  given_by: {
    _id: {type: ObjectId, ref: 'wizers'},
    displayName: {type: String}
  }
});

const wizersSchema = new Schema({
  email: {type: String, required: true, trim: true, unique: true},
  displayName: {type: String},
  jobTitle: {type: String},
  image: {type: String},
  stars: [starsSchema]
});

module.exports = mongoose.model('wizers', wizersSchema);
