const jwt = require("jsonwebtoken");

exports.generateToken = (user) => {
    return jwt.sign({ id: user.id , fullName: user.fullName}, process.env.JWT_SECRET, {expiresIn: '7d'});
}
