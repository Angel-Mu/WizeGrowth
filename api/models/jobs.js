const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const jobsSchema = new Schema({
  name: { type: String },
  description: { type: String },
});

module.exports = mongoose.model('jobs', jobsSchema);
