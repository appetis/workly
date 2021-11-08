const router = require('express').Router();
const fs = require('fs');
const userController = require('../controllers').user;
const { verifyToken, upload } = require('./middlewares');

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.log('Create uploads directory');
  fs.mkdirSync('uploads');
}

module.exports = app => {
  router.post('/users', userController.create);
  router.get('/users', verifyToken, userController.getUsers);
  router.get('/users/:id', verifyToken, userController.getUserById);
  router.get('/users/:id/status', verifyToken, userController.getUserStatusById);
  router.post('/users/:id/verify', userController.verify);
  router.post('/users/:id/profile', userController.updateProfile);
  router.post('/users/:id/avatar', upload.single('avatar'), userController.updateAvatar);

  app.use('/api', router);
};
