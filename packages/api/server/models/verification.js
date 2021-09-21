module.exports = (sequelize, DataTypes) => {
  const Verification = sequelize.define('Verification', {
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
  Verification.associate = (db) => {
    db.Verification.belongsTo(db.User);
  };
  return Verification;
}
