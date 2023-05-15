const { format, isSameDay, parseISO } = require('date-fns');
const { Op } = require('sequelize');
const db = require('../db/conn');

// MODELS
const flights = db.flights;
const flightsClasses = db.flight_classes;

class TicketController {
  async findTickets(req, res) {
    try {
      const { origin_id, destination_id, date } = req.body;

      const today = new Date();
      let currentDateTime = parseISO(date);

      if (isSameDay(currentDateTime, today)) {
        currentDateTime = format(today, "yyyy-MM-dd'T'HH:mm:ss.SSS'-0300'");
      }

      const flightsFound = await flights.findAll({
        where: {
          origin_id,
          destination_id,
          status: 1, // Active Status
          seats_availible: {
            [Op.gt]: 0,
          },
          departure_time: {
            [Op.gte]: new Date(`${currentDateTime}`),
            [Op.lte]: new Date(`${date} 23:59:59`),
          },
        },
        include: [
          {
            model: flightsClasses,
            attributes: ['name', 'seats_availible', 'price_per_seat'],
          },
        ],
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
