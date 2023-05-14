module.exports = (sequelize, DataTypes) => {
  const FlightClass = sequelize.define(
    'flight_classes',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING(2),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(90),
        allowNull: false,
      },
      qty_of_seats: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price_of_seats: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
    },
    {
      underscored: true,
      timestamps: false,
    }
  );

  FlightClass.associate = function (models) {
    FlightClass.belongsTo(models.flights, { foreignKey: 'flight_id' });
  };
  return FlightClass;
};
