const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

exports.authenticate = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).send("Access denied.");
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(StatusCodes.UNAUTHORIZED).send("Invalid token.");
  }
};