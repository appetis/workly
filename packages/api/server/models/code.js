module.exports = (sequelize, DataTypes) => {
  const Code = sequelize.define(
    'Code',
    {
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
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

  Code.associate = db => {};

  return Code;
};
