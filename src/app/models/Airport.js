module.exports = (sequelize, DataTypes) => {
  const Airports = sequelize.define(
    'airports',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(90),
        allowNull: false,
      },
      cod_iata: {
        type: DataTypes.STRING(3),
        allowNull: false,
      },
    },
    {
      underscored: true,
      timestamps: false,
    }
  );
  Airports.associate = function (models) {
    Airports.belongsTo(models.cities, { foreignKey: 'city_id' });
  };
  return Airports;
};
