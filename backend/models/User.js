//imports
const mongoose = require('mongoose')
const { Schema } = mongoose;

//define schemas
//schemas also store in object format
const UserSchema = new Schema({
    username:{
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        max: 50
    },
    password:{
        type: String,
        required: true,
        min: 6
    },
    profilePicture:{
      type: String,
      default: ""   //empty string
    },
    coverPicture:{
      type: String,
      default: ""
    },
    followers:
    {
      type: Array,
      default: []   //empty array because data store in array format like 1 2 followers
    },
    following:
    {
      type: Array,
      default: []   //empty array because data store in array format like 1 2 followers
    },
    isAdmin:
    {
      type: Boolean,
      default: false
    },
    desc:
    {
      type: String,
      max: 50
    },
    city:
    {
      type: String,
      max: 50
    },
     from:
    {
      type: String,
      max: 50
    },
    relationship:
    {
      type: Number,
      enum: [1, 2, 3]
    }
  },
  {timestamps : true}
);

module.exports = mongoose.model('User', UserSchema);

