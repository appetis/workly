module.exports = (sequelize, DataTypes) => {
  const Dashboard = sequelize.define(
    'Dashboard',
    {
      title: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      theme: {
        type: DataTypes.STRING(4),
        allowNull: false,
        defaultValue: 'LI',
      },
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
  );

  Dashboard.associate = db => {
    db.Profile.belongsTo(db.User);
  };

  return Dashboard;
};
