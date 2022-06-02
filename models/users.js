const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Enter the name!"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Enter the email!"],
  },
  phone: {
    type: Number,
    minimum: 0,
  },
  password: {
    type: String,
    required: [true, "Enter the password!"],
  },
  address: {
    type: String,
  },
  role_id: {
    type: Number,
  },
  created_date: {
    type: Date,
  },
  last_activity: {
    type: Date,
  },
});
