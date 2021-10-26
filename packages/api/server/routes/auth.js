const router = require('express').Router();
const authController = require('../controllers').auth;

module.exports = app => {
  router.post('/auth/login', authController.login);
  router.post('/auth/refresh', authController.refresh);

  app.use('/api', router);
};
