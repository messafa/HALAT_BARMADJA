const e = require("express");
const jwt = require("jsonwebtoken");

exports.generateToken = (user) => {
    //return name and id exparation time is 10 days
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "10d" });
}

exports.verifyToken = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
}