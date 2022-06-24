const router = require('express').Router();
const userController = require('../controllers').user;
const { verifyToken, upload } = require('./middlewares');

module.exports = app => {
  router.post('/users', userController.create);
  router.get('/users', verifyToken, userController.getUsers);
  router.get('/users/:id', verifyToken, userController.getUserById);
  router.get('/users/:id/status', verifyToken, userController.getUserStatusById);
  router.post('/users/:id/verify', userController.verify);
  router.post('/users/:id/profile', verifyToken, userController.updateProfile);
  router.post('/users/:id/avatar', verifyToken, upload.single('avatar'), userController.updateAvatar);
  router.post('/users/:id/name', verifyToken, userController.updateName);
  router.post('/users/:id/department', verifyToken, userController.updateDepartment);
  router.post('/users/:id/position', verifyToken, userController.updatePosition);
  router.post('/users/:id/phone', verifyToken, userController.updatePhone);
  router.post('/users/:id/phone-ext', verifyToken, userController.updatePhoneExt);

  app.use('/api', router);
};
