const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: [
    "http://localhost:5173",
    "https://mern-task-manager-frontend-nine.vercel.app"
   ],
  credentials: true,
  })
);
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});

app.get("/", (req, res) => {
    res.send("Task Manager API Running");
});

const PORT = process.env.PORT || 5000;
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
