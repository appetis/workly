module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    'Event',
    {
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING(4),
        allowNull: false,
      },
      startAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING(7),
        allowNull: false,
      },
      timed: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
  );

  Event.associate = db => {
    db.Event.belongsToMany(db.User, { through: 'UserEvent' });
    db.Event.belongsToMany(db.Team, { through: 'TeamEvent' });
  };

  return Event;
};
