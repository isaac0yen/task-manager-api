const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const Validate = require('../helpers/validate');

// Middleware to validate registration data
function validateRegistrationData(req, res, next) {
  const { username, email, password } = req.body;

  if (!Validate.string(username)) {
    return res.status(400).json({ message: 'Username must be a string' });
  }
  if (!Validate.email(email)) {
    return res.status(400).json({ message: 'Email must be valid' });
  }
  if (!Validate.string(password)) {
    return res.status(400).json({ message: 'Password must be a string' });
  }

  next();
}

// Middleware to validate login data
function validateLoginData(req, res, next) {
  const { email, password } = req.body;

  if (!Validate.email(email)) {
    return res.status(400).json({ message: 'Email must be valid' });
  }
  if (!Validate.string(password)) {
    return res.status(400).json({ message: 'Password must be a string' });
  }

  next();
}

// Route for user registration
router.post('/register', validateRegistrationData, register);

// Route for user login
router.post('/login', validateLoginData, login);

module.exports = router;
