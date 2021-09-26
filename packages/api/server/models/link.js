module.exports = (sequelize, DataTypes) => {
  const Link = sequelize.define(
    'Link',
    {
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
  );

  Link.associate = db => {
    db.Link.belongsToMany(db.User, { through: 'UserLink' });
    db.Link.belongsToMany(db.Team, { through: 'TeamLink' });
  };

  return Link;
};
