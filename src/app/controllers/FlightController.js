const db = require('../db/conn');

// MODELS
const Airports = db.airports;
const Cities = db.cities;
const Flights = db.flights;
const FlightClasses = db.flight_classes;

class FlightController {
  async createFlight(req, res) {
    try {
      const { departure_time, origin_id, destination_id, classes } = req.body;

      // Creating flight info
      const flight = await Flights.create({
        flight_number: 'Teste',
        departure_time,
        origin_id,
        destination_id,
      });

      // Creating classes info and association
      for (let i = 0; i < classes.length; i++) {
        let { type, name, qty_of_seats, price_per_seat } = classes[i];

        await FlightClasses.create({
          type,
          name,
          qty_of_seats,
          price_per_seat,
          flight_id: flight.id,
        });
      }

      res.status(200).json({ msg: 'ok' });
      return;
    } catch (error) {
      console.log(error);
      res.status(500);
      return;
    }
  }
  async listAllFlights(req, res) {
    try {
      const AllFlights = await Flights.findAll({
        include: [
          {
            model: FlightClasses,
            attributes: { exclude: ['flight_id', 'flightId'] },
          },
        ],
      });
      res.status(200).json({ flights: AllFlights });
    } catch (error) {
      console.log(error);
      res.status(500);
      return;
    }
  }
}

module.exports = new FlightController();
