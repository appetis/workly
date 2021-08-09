const teamController = require('../controllers').team;
const router = require("express").Router();
const { verifyToken } = require("./middlewares");

module.exports = (app) => {
    router.post('/teams', verifyToken, teamController.create);
    router.get('/teams/:name', verifyToken, teamController.getByName);
    router.post('/teams/:id/join', verifyToken, teamController.join);

    app.use('/api', router);
}
