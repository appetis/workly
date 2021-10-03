const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.User = require('./user')(sequelize, Sequelize);
db.UserRole = require('./user_role')(sequelize, Sequelize);
db.Team = require('./team')(sequelize, Sequelize);
db.UserTeam = require('./user_team')(sequelize, Sequelize);
db.Verification = require('./verification')(sequelize, Sequelize);
db.Code = require('./code')(sequelize, Sequelize);
db.Profile = require('./profile')(sequelize, Sequelize);
db.Dashboard = require('./dashboard')(sequelize, Sequelize);
db.Link = require('./link')(sequelize, Sequelize);
db.Event = require('./event')(sequelize, Sequelize);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
