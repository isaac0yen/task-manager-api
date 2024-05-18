const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('../helpers/mySQL');
const Validate = require('../helpers/validate');
const Logger = require('../utils/logger');

/**
 * Registers a new user
 */
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input data
    if (!Validate.string(username) || !Validate.email(email) || !Validate.string(password)) {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    // Check if the email already exists
    const existingUser = await db.findOne('user', { email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const userId = await db.insertOne('user', { username, email, password: hashedPassword });

    res.status(201).json({ id: userId, message: 'User registered successfully' });
  } catch (error) {
    Logger.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Logs in an existing user
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input data
    if (!Validate.email(email) || !Validate.string(password)) {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    // Find the user by email
    const user = await db.findOne('user', { email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, message: 'Login successful' });
  } catch (error) {
    Logger.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = {
  register,
  login,
};
