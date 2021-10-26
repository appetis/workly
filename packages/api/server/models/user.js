module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
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

  User.associate = db => {
    db.User.belongsToMany(db.Link, { through: 'UserLink' });
    db.User.hasOne(db.Profile);
    db.User.hasOne(db.Token, { foreignKey: { unique: true, allowNull: false } });
    db.User.hasMany(db.Verification);
    db.User.hasMany(db.UserRole);
    db.User.hasMany(db.Dashboard);
  };

  return User;
};
