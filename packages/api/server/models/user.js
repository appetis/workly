module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(4),
      allowNull: false,
      defaultValue: 'CR'
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });
  User.associate = (db) => {
    db.User.belongsToMany(db.Team, { through: 'UserTeam' });
    db.User.hasMany(db.Code);
  };
  return User;
}
