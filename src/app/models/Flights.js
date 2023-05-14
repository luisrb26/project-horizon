module.exports = (sequelize, DataTypes) => {
  const Flights = sequelize.define(
    'flights',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      flight_number: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      departure_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      seats_availible: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      underscored: true,
      timestamps: false,
    }
  );
  Flights.associate = function (models) {
    Flights.belongsTo(models.airports, { foreignKey: 'origin_id' });
    Flights.belongsTo(models.airports, { foreignKey: 'destination_id' });
    Flights.hasMany(models.flight_classes);
  };
  return Flights;
};
