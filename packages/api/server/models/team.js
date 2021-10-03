module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define(
    'Team',
    {
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
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

  Team.associate = db => {
    db.Team.belongsToMany(db.Verification, { through: 'TeamVerification' });
    db.Team.belongsToMany(db.Link, { through: 'TeamLink' });
  };

  return Team;
};
