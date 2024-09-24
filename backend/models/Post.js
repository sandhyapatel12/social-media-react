//imports
const mongoose = require('mongoose')
const { Schema } = mongoose;

//define schemas
//schemas also store in object format
const Postschema = new Schema({
  userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', Postschema);
