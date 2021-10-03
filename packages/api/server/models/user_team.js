module.exports = (sequelize, DataTypes) => {
  const UserTeam = sequelize.define(
    'UserTeam',
    {
      status: {
        type: DataTypes.STRING(4),
        allowNull: false,
        defaultValue: 'CR',
      },
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
  );

  UserTeam.associate = db => {
    db.User.belongsToMany(db.Team, { through: 'UserTeam' });
    db.Team.belongsToMany(db.User, { through: 'UserTeam' });
  };

  return UserTeam;
};
