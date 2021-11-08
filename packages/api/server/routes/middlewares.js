const jwt = require('jsonwebtoken');
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const AWS_S3_CONFIG = {
  accessKeyId: process.env.AWS_S3_IMAGES_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_IMAGES_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
};

exports.upload = multer({
  storage: multerS3({
    s3: new AWS.S3(AWS_S3_CONFIG),
    bucket: 'workly-images',
    key(req, file, cb) {
      cb(null, `avatars/${Date.now()}_${path.basename(file.originalname)}`);
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
