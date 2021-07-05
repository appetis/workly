const userController = require('../controllers').user;
const router = require("express").Router();
const { verifyToken } = require("./middlewares");

module.exports = (app) => {
    router.post('/users', userController.create);
    router.get('/users', verifyToken, userController.getUsers);
    router.get('/users/:id', verifyToken, userController.getUser);

    app.use('/api', router);
}
