module.exports = (sequelize, DataTypes) => {
  const Tickets = sequelize.define(
    'tickets',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
      },
      price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
    },
    {
      underscored: true,
      timestamps: false,
    }
  );

  Tickets.associate = function (models) {
    Tickets.belongsTo(models.flights, { foreignKey: 'flight_id' });
    Tickets.belongsTo(models.flight_classes, {
      foreignKey: 'flight_classes_id',
    });
    Tickets.belongsTo(models.baggage);
    Tickets.belongsTo(models.buyers);
    Tickets.hasOne(models.seats);
  };

  return Tickets;
};
