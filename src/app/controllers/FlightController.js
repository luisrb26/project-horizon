const db = require('../db/conn');

// MODELS
const Flights = db.flights;
const FlightClasses = db.flight_classes;
const Seats = db.seats;

// MIDDLEWARES
const getToken = require('../middlewares/getToken');
const getUserByToken = require('../middlewares/getUserByToken');

class FlightController {
  async createFlight(req, res) {
    try {
      const token = getToken(req);
      const loggedUser = await getUserByToken(token);

      if (!loggedUser) {
        res.status(401).json({ msg: 'You need to send a valid token' });
        return;
      }
    } catch (error) {
      console.log(error);
      res.status(500);
      return;
    }

    try {
      const { departure_time, origin_id, destination_id, classes } = req.body;
      // Creating flight info
      const flight = await Flights.create({
        flight_number: 'Teste',
        departure_time,
        origin_id,
        destination_id,
        seats_availible: 0,
      });

      let allSeats = 0;
      for (let i = 0; i < classes.length; i++) {
        let { type, name, qty_of_seats, price_per_seat } = classes[i];
        // Creating classes info and association
        const flightClass = await FlightClasses.create({
          type,
          name,
          qty_of_seats,
          price_per_seat,
          flight_id: flight.id,
          seats_availible: qty_of_seats,
        });

        allSeats += qty_of_seats;

        // Generating seats name
        let seatsNames = [];
        for (let i = 1; i <= qty_of_seats; i++) {
          const number = i.toString();
          seatsNames.push(type + number);
        }

        // Bulk creating seats info
        await Seats.bulkCreate(
          // Creates a array of objects with attribute seat_name
          seatsNames.map((seatName) => ({
            seat_name: seatName,
            flight_class_id: flightClass.id,
          }))
        )
          .then(() => {
            console.log('ok');
          })
          .catch((error) => {
            console.error('Error', error);
          });
      }

      await flight.update({ seats_availible: allSeats });

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
