const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    port: process.env.PORT || 5001,
    jwtSecret: process.env.JWT_SECRET,
    dataPath: './database'
};