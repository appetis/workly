const usersController = require('../controllers').users;
const router = require("express").Router();
const { verifyToken } = require("./middlewares");

module.exports = (app) => {
    router.post('/users', usersController.create);
    router.get('/users', verifyToken, usersController.getUsers);
    router.get('/users/:id', verifyToken, usersController.getUser);

    app.use('/api', router);
}
