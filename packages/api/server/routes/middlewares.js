const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const s3Service = require('../services/s3.service');

exports.upload = multer({
  storage: multerS3({
    s3: s3Service.getAwsS3(),
    bucket: s3Service.getBucket(),
    key(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, `${s3Service.getOriginalPath()}${uuidv4()}${ext}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
      return cb(null, true);
    }
    return cb('Only jpg, jpeg, png images are allowed');
  },
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

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
