const authController = require('../controllers').auth;
let router = require("express").Router();

module.exports = (app) => {
    router.post('/token', authController.generateToken);

    app.use('/api', router);
}
