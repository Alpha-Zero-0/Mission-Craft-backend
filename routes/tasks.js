const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const jwt = require("jsonwebtoken");

// Middleware to verify user
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contains the user ID
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};

// Save all tasks

router.post("/save", authMiddleware, async (req, res) => {
  const { tasks, date } = req.body;

  try {
    // Remove old tasks for the same user + date
    await Task.deleteMany({ userId: req.user.id, date });

    // Insert all new tasks
    const newTasks = tasks.map((t) => ({
      userId: req.user.id,
      name: t.name,
      time: t.time,
      date,
    }));

    await Task.insertMany(newTasks);
    res.json({ message: "Tasks saved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/tasks/:date - fetch tasks for a specific user + date
router.get("/:date", authMiddleware, async (req, res) => {
  const date = req.params.date;

  try {
    const tasks = await Task.find({
      userId: req.user.id,
      date,
    });

    res.json(tasks);
  } catch (err) {
    console.error("❌ Failed to load tasks:", err);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
