const { db } = require('../helpers/mySQL');
const Validate = require('../helpers/validate');
const Logger = require('../utils/logger');

// Function to create a new task
const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.context.id;

    if (!Validate.string(title)) {
      return res.status(400).json({ message: "Title must be a string" });
    }

    const taskId = await db.insertOne("task", { title, description, user_id: userId });

    const newTask = { id: taskId, title, description, user_id: userId };

    // Emit event to all clients
    req.io.emit("taskCreated", newTask);

    res.status(201).json({ id: taskId });
  } catch (error) {
    Logger.error("Error creating task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to retrieve all tasks for a user
const readTask = async (req, res) => {
  try {
    const userId = req.context.id;
    const tasks = await db.findMany("task", { user_id: userId });

    res.status(200).json(tasks);
  } catch (error) {
    Logger.error("Error retrieving tasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to update an existing task
const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, description } = req.body;
    const userId = req.context.id;

    if (!Validate.string(title)) {
      return res.status(400).json({ message: "Title must be a string" });
    }

    await db.updateOne("task", { title, description }, { id: taskId, user_id: userId });

    const updatedTask = { id: taskId, title, description, user_id: userId };

    // Emit event to all clients
    req.io.emit("taskUpdated", updatedTask);

    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    Logger.error("Error updating task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to delete an existing task
const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.context.id;

    await db.deleteOne("task", { id: taskId, user_id: userId });

    // Emit event to all clients
    req.io.emit("taskDeleted", { id: taskId, user_id: userId });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    Logger.error("Error deleting task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to retrieve all tasks for a user
const getAllTasks = async (req, res) => {
  try {
    const userId = req.context.id;
    const tasks = await db.findMany("task", { user_id: userId });

    res.status(200).json(tasks);
  } catch (error) {
    Logger.error("Error retrieving tasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to retrieve a task by ID
const getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.context.id;
    const task = await db.findOne("task", { id: taskId, user_id: userId });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    Logger.error("Error retrieving task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createTask,
  readTask,
  updateTask,
  deleteTask,
  getAllTasks,
  getTaskById
};
