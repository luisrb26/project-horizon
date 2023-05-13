module.exports = (sequelize, DataTypes) => {
  const Cities = sequelize.define(
    'cities',
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
      uf: {
        type: DataTypes.STRING(2),
        allowNull: false,
      },
    },
    {
      underscored: true,
      timestamps: false,
    }
  );
  return Cities;
};
