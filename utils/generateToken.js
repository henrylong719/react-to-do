const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    // expire time
    // "expiresIn" should be a number of seconds or string that represents a time span eg: "1d", "20h",
    expiresIn: '30d',
  });
};

module.exports = generateToken;
