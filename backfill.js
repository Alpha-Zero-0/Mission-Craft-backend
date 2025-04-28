require("dotenv").config();
const mongoose = require("mongoose");
const Task = require("./models/Task");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log("✅ Connected to MongoDB");

  const tasks = await Task.find({ completed: { $exists: false } });

  console.log(`Found ${tasks.length} tasks to backfill`);

  for (let task of tasks) {
    task.completed = false;
    await task.save();
  }

  console.log("✅ Backfill complete!");
  process.exit(0);
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
  process.exit(1);
});
