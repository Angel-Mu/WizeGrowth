const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


const starsSchema = new Schema({
  caption: { type: String },
  description: { type: String },
  requirements: { type: String },
  rate: { type: String, enum: [ 'BRONZE', 'SILVER', 'GOLD' ] },
  image: { type: String },
  jobs: [ Number ],
  category: { type: ObjectId, ref: "categories" }
});

module.exports = mongoose.model('stars', starsSchema);
