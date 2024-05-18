const express = require("express");
const router = express.Router();
const Validate = require("../helpers/validate");
const {
  readUser,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

// Middleware to validate user data
function validateUserData(req, res, next) {
  const { username, email, password } = req.body;

  // Validate user data
  if (!Validate.string(username)) {
    return res.status(400).json({ message: "Username must be a string" });
  }
  if (!Validate.email(email)) {
    return res.status(400).json({ message: "Email must be valid" });
  }
  if (!Validate.string(password)) {
    return res.status(400).json({ message: "Password must be a string" });
  }

  next();
}

// Route for getting all users
router.get("/users", readUser);

// Route for getting a user by ID
router.get("/users/:id", getUserById);

// Route for updating a user
router.put("/users/:id", validateUserData, updateUser);

// Route for deleting a user
router.delete("/users/:id", deleteUser);

module.exports = router;
