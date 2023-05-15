module.exports = (sequelize, DataTypes) => {
  const Baggage = sequelize.define(
    'baggage',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
      },
      identification: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true,
      },
      baggage_fee: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      underscored: true,
      timestamps: false,
    }
  );

  Baggage.associate = function (models) {
    Baggage.hasOne(models.tickets, { foreignKey: 'baggage_id' });
  };

  return Baggage;
};
