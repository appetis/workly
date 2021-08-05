module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('Team', {
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true
    },
    status: {
      type: DataTypes.ENUM('ACTIVE', 'INACTIVE'),
      allowNull: false,
      defaultValue: 'ACTIVE'
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });
  Team.associate = (db) => {
    db.Team.belongsToMany(db.User, { through: 'UserTeam' });
  };
  return Team;
}
