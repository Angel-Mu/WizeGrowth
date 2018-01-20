const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


const starsSchema = {
  _id: { type: ObjectId, ref: 'stars' },
  caption: { type: String },
};

const rolesSchema = {
  _id: { type: ObjectId, ref: 'roles' },
  name: { type: String },
};

const wizersSchema = new Schema({
  email: { type: String, required: true, trim: true, unique: true },
  fullname: { type: String },
  role: [ rolesSchema ],
  caption: { type: String },
  description: { type: String },
  requirements: { type: String },
  rate: { type: String, enum: [ 'BRONZE', 'SILVER', 'GOLD' ] },
  image: { type: String },
  jobs: [ starsSchema ],
  category: categorySchema,
});

module.exports = mongoose.model('wizers', wizersSchema);
