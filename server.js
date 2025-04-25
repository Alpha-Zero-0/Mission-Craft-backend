const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Middleware must come before routes
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json()); // 👈 Moved this line up here

// ✅ Routes
const taskRoutes = require("./routes/tasks");
app.use("/api/tasks", taskRoutes);

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// ✅ Test route
app.get("/test", (req, res) => {
  res.json({ message: "Test route is working" });
});

// ✅ MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Start server
const PORT = process.env.PORT || 5432;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
