module.exports = (sequelize, DataTypes) => {
  const Seats = sequelize.define(
    'seats',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
      },
      seat_name: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      available: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      underscored: true,
      timestamps: false,
    }
  );
  Seats.associate = function (models) {
    Seats.belongsTo(models.flight_classes);
    Seats.belongsTo(models.tickets);
  };
  return Seats;
};
