const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


const rolesSchema = {
  _id: { type: ObjectId, ref: 'roles' },
  name: { type: String },
};

const jobsSchema = {
  _id: { type: ObjectId, ref: 'jobs' },
  name: { type: String },
};

const categoriesSchema = {
  _id: { type: ObjectId, ref: 'categories' },
  name: { type: String },
};

const starsSchema = {
  _id: { type: ObjectId, ref: 'stars' },
  caption: { type: String },
  requirements: { type: String },
  image: { type: String },
  rate: { type: String, enum: [ 'BRONZE', 'SILVER', 'GOLD' ] },
  category: categoriesSchema,
  given_by: {
    _id: { type: ObjectId, ref: 'wizers' },
    fullname: { type: String },
    additional_notes: { type: String },
  },
  received_date: { type: Date },
};

const wizersSchema = new Schema({
  email: { type: String, required: true, trim: true, unique: true },
  fullname: { type: String },
  role: [ rolesSchema ],
  image: { type: String },
  jobs: [ jobsSchema ],
});

module.exports = mongoose.model('wizers', wizersSchema);
