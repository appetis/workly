const router = require('express').Router();
const teamController = require('../controllers').team;
const { verifyToken } = require('./middlewares');

module.exports = app => {
  router.post('/teams', verifyToken, teamController.create);
  router.get('/teams/:name', verifyToken, teamController.getByName);
  router.post('/teams/:id/join', verifyToken, teamController.join);
  router.get('/teams/:id/members', verifyToken, teamController.getMembersById);

  app.use('/api', router);
};
