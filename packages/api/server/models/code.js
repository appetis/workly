module.exports = (sequelize, DataTypes) => {
  const Code = sequelize.define('Code', {
    code: {
      type: DataTypes.STRING(6),
      allowNull: false,
      unique: true
    },
    status: {
      type: DataTypes.STRING(4),
      allowNull: false,
      defaultValue: 'CR'
    },
    expiredAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });
  Code.associate = (db) => {
    db.Code.belongsTo(db.User);
  };
  return Code;
}
