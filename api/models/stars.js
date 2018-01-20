const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


const jobsSchema = {
  _id: { type: ObjectId, ref: 'jobs' },
  name: { type: String },
};

const categoriesSchema = {
  _id: { type: ObjectId, ref: 'categories' },
  name: { type: String },
};

const starsSchema = new Schema({
  caption: { type: String },
  description: { type: String },
  requirements: { type: String },
  rate: { type: String, enum: [ 'BRONZE', 'SILVER', 'GOLD' ] },
  image: { type: String },
  jobs: [ jobsSchema ],
  category: categoriesSchema,
});

module.exports = mongoose.model('stars', starsSchema);
