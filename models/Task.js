const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: String,
  time: Number,
  date: { type: String, required: true }, // Store as YYYY-MM-DD
});

module.exports = mongoose.model("Task", taskSchema);
