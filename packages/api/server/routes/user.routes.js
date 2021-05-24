const usersController = require('../../controllers').users;
var router = require("express").Router();
module.exports = (app) => {
    router.post('/users', usersController.create);
    router.get('/users', usersController.list);
    router.get('/users/:userId', usersController.retrieve);

    app.use('/api', router);
}