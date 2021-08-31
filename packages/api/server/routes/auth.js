const authController = require('../controllers').auth;
let router = require("express").Router();

module.exports = (app) => {
    router.post('/login', authController.login);

    app.use('/api', router);
}
