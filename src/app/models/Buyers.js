module.exports = (sequelize, DataTypes) => {
  const Buyers = sequelize.define(
    'buyers',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING(90),
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING(2),
        allowNull: false,
      },
      cpf: {
        type: DataTypes.STRING(11),
        allowNull: false,
      },
      birth_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      sex: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      underscored: true,
      timestamps: false,
    }
  );

  Buyers.associate = function (models) {
    Buyers.hasMany(models.tickets, { foreignKey: 'buyer_id' });
  };
  return Buyers;
};
