const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // console.log('testttt');

      token = req.headers.authorization.split(' ')[1];

      const decode = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decode.id).select('-password');

      // console.log('update');
      next();

      // console.log('test');
    } catch (error) {
      //   console.error(error);

      return res.status(401).send('Not authorized');
    }
  }
  // console.log(token);

  if (!token) {
    // console.log('update');
    return res.status(401).send('Not authorized, no token');
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    // 401 Unauthorized
    res.status(401).send('Not authorized as an admin');
  }
};

module.exports = { protect, admin };
