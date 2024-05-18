const { db } = require('../helpers/mySQL');
const Validate = require('../helpers/validate');
const Logger = require('../utils/logger');


// Function to retrieve all users
const readUser = async (req, res) => {
  try {
    // Retrieve all users from the database
    const users = await db.findMany("user");

    // Send response with the list of users
    res.status(200).json(users);
  } catch (error) {
    Logger.error("Error retrieving users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Function to retrieve a user by ID
const getUserById = async (req, res) => {
  try {
    // Extract the user ID from the request parameters
    const userId = req.params.id;

    // Retrieve the user from the database
    const user = await db.findOne("user", { id: userId });

    // Check if the user was found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send response with the user data
    res.status(200).json(user);
  } catch (error) {
    Logger.error("Error retrieving user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Function to update an existing user
const updateUser = async (req, res) => {
  try {
    // Extract necessary information from the request parameters and body
    const userId = req.params.id;
    const { username, email, password } = req.body;

    // Validate input data
    if (username && !Validate.string(username)) {
      return res.status(400).json({ message: "Username must be a string" });
    }
    if (email && !Validate.email(email)) {
      return res.status(400).json({ message: "Email must be valid" });
    }
    if (password && !Validate.string(password)) {
      return res.status(400).json({ message: "Password must be a string" });
    }

    // Update the user in the database
    await db.updateOne("user", { username, email, password }, { id: userId });

    // Send response indicating success
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    Logger.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Function to delete an existing user
const deleteUser = async (req, res) => {
  try {
    // Extract the user ID from the request parameters
    const userId = req.params.id;

    // Delete the user from the database
    await db.deleteOne("user", { id: userId });

    // Send response indicating success
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    Logger.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  readUser,
  getUserById,
  updateUser,
  deleteUser,
};
