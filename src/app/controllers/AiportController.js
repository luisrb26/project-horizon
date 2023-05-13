const db = require('../db/conn');

// MODELS
const airports = db.airports;
const cities = db.cities;

class AirportController {
  async listAll(req, res) {
    try {
      const allAirports = await airports.findAll({
        attributes: { exclude: ['city_id'] },
        include: [
          {
            model: cities,
            attributes: ['name', 'uf'],
          },
        ],
      });

      if (Object.keys(allAirports).length === 0) {
        res.status(404).json({
          msg: 'Não foram encontrados aeroportos cadastrados!',
        });
      } else {
        res.status(200).json({
          airports: allAirports,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500);
      return;
    }
  }
}

module.exports = new AirportController();
