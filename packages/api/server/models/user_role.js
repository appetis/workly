module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define(
    'UserRole',
    {
      code: {
        type: DataTypes.STRING(4),
        allowNull: false,
        unique: true,
      },
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
  );

  UserRole.associate = db => {
    db.UserRole.belongsTo(db.User);
  };

  return UserRole;
};
