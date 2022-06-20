module.exports = (sequelize, DataTypes) => {
  const Color = sequelize.define(
    'Color',
    {
      color: {
        type: DataTypes.STRING(7),
        allowNull: false,
      },
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
  );

  Color.associate = db => {
    db.Color.hasMany(db.Profile);
  };

  return Color;
};
