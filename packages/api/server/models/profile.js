module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define(
    'Profile',
    {
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING(200),
      },
      department: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      position: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      phone_ext: {
        type: DataTypes.STRING(5),
      },
      status: {
        type: DataTypes.STRING(4),
        allowNull: false,
        defaultValue: 'OF',
      },
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
  );

  Profile.associate = db => {
    db.Profile.belongsTo(db.User);
  };

  return Profile;
};
