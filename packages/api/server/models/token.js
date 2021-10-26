module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define(
    'Token',
    {
      type: {
        type: DataTypes.ENUM('refresh'),
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING(36),
        allowNull: false,
        unique: true,
      },
      expiredAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
  );

  Token.associate = db => {
    db.Token.belongsTo(db.User);
  };

  return Token;
};
