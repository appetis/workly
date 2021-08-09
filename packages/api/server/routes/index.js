module.exports = (app) => {
    require('./user')(app);
    require('./auth')(app);
    require('./team')(app);
}
