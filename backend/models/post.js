const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: {type: String, required: true},
  content: { type: String, required: true},
  imageUrl: { type: String},
  tags: [{}]
});

module.exports = mongoose.model('Posts', postSchema);
