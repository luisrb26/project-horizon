const { Op } = require('sequelize');
const db = require('../db/conn');

// MODELS
const flights = db.flights;
const flightsClasses = db.flight_classes;

class TicketController {
  async findTickets(req, res) {
    try {
      const { origin_id, destination_id, date } = req.body;

      const flightsFound = await flights.findAll({
        include: [
          {
            model: flightsClasses,
            attributes: ['name', 'seats_availible', 'price_per_seat'],
          },
        ],
        where: {
          origin_id,
          destination_id,
          status: 1,
          seats_availible: {
            [Op.gt]: 0,
          },
          departure_time: {
            [Op.gte]: new Date(`${date}`),
            [Op.lte]: new Date(`${date} 23:59:59`),
          },
        },
      });

      res.status(200).json({ tickets: flightsFound });
    } catch (error) {
      console.log(error);
      res.status(500);
      return;
    }
  }
}

module.exports = new TicketController();
