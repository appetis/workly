const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    req.decoded = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(461).json({
        code: 461,
        message: 'Token expired',
      });
    }

    return res.status(401).json({
      code: 401,
      message: 'Invalid token',
    });
  }
};
