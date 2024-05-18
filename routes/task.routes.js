const express = require("express");
const router = express.Router();
const Validate = require("../helpers/validate");
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

// Middleware to validate task data
function validateTaskData(req, res, next) {
  const { title, description } = req.body;

  // Validate task title (required)
  if (!Validate.string(title)) {
    return res.status(400).json({ message: "Title must be a string" });
  }

  // Validate task description (optional)
  if (description && !Validate.string(description)) {
    return res.status(400).json({ message: "Description must be a string" });
  }

  next();
}

// Route for creating a new task
router.post("/tasks", validateTaskData, createTask);

// Route for getting all tasks
router.get("/tasks", getAllTasks);

// Route for getting a task by ID
router.get("/tasks/:id", getTaskById);

// Route for updating a task
router.put("/tasks/:id", validateTaskData, updateTask);

// Route for deleting a task
router.delete("/tasks/:id", deleteTask);

module.exports = router;
