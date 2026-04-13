process.on('uncaughtException', err => {
  console.error("UNCAUGHT ERROR:", err);
});
process.on('unhandledRejection', err => {
  console.error("UNHANDLED PROMISE:", err);
});
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "*",
}));
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb+srv://sonuagrawal122712_db_user:79BPAtah0TqtTTjI@cluster0.4agzegj.mongodb.net/todo")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Schema
const TaskSchema = new mongoose.Schema({
  text: String,
  completed: Boolean
});

const Task = mongoose.model("Task", TaskSchema);

// Test route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Backend is working ✅" });
});

// Get tasks
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Add task
app.post("/tasks", async (req, res) => {
  const newTask = new Task(req.body);
  await newTask.save();
  res.json(newTask);
});

// Delete task
app.delete("/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// Update task
app.put("/tasks/:id", async (req, res) => {
  const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Start server
const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});