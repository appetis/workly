const router = require('express').Router();
const userController = require('../controllers').user;
const { verifyToken } = require('./middlewares');

module.exports = app => {
  router.post('/users', userController.create);
  router.get('/users', verifyToken, userController.getUsers);
  router.get('/users/:id', verifyToken, userController.getUserById);
  router.post('/users/:id/verify', userController.verify);
  router.post('/users/:id/profile', userController.updateProfile);

  app.use('/api', router);
};
