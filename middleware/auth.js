require("dotenv").config();
const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      const error = new Error("Not Authenticated");
      error.statusCode = 401;
      throw error;
    }
    const token = authHeader.split(" ")[1];

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      console.log(error);
      const err = new Error("Token validation failed");
      err.statusCode = 500;
      throw err;
    }

    if (!decodedToken) {
      const error = new Error("Not Authenticated");
      error.statusCode = 401;
      throw error;
    }

    req.context = { ...decodedToken };

    next();
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    console.log(error);

    next(error);
  }
};