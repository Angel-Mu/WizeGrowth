const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


const rewardsSchema = new Schema({
  user: { type: String, required: true },
  star: { type: ObjectId, ref: 'stars', required: true }
});

module.exports = mongoose.model('rewards', rewardsSchema);
