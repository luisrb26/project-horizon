const db = require('../db/conn');

// MODELS
const airports = db.airports;

class AirportController {
  async listAll(req, res) {
    try {
      res.status(200).json({
        msg: `Teste`,
      });
    } catch (error) {
      console.log(error);
      res.status(500);
      return;
    }
  }
}

module.exports = new AirportController();
