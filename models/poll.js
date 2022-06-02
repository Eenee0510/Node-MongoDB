const mongoose = require("mongoose");
const pollSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  pollName: Number,
});
module.exports = mongoose.model("Poll", pollSchema);