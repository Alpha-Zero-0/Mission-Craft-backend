const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: String, required: true }, // format: YYYY-MM-DD
  name: { type: String, required: true },
  time: { type: Number, default: 0 },
  completed: { type: Boolean, default: false }, // ✅ NEW FIELD
});

module.exports = mongoose.model("Task", TaskSchema);

