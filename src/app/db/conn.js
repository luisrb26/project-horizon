const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const models = path.join(__dirname, '../', 'models');

require('dotenv').config();

const db = {};

const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: process.env.DB_DIALECT,
});

fs.readdirSync(models)
  .filter(function (file) {
    var basename = path.basename(module.filename);
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach(function (file) {
    // Starts all modules
    var model = require(path.join(models, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

// Starts all associations
Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize; // for accessing static props and functions like Op.or
db.sequelize = sequelize; // for accessing connection props and functions like 'query' or 'transaction'

module.exports = db;
