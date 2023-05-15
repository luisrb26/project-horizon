const { format, isSameDay, parseISO } = require('date-fns');
const { Op } = require('sequelize');
const db = require('../db/conn');

// MODELS
const flights = db.flights;
const Tickets = db.tickets;
const Buyers = db.buyers;
const Baggage = db.baggage;
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
  async buyTickets(req, res) {
    const { buyers } = req.body;

    for (let i = 0; i < buyers.length; i++) {
      let buyer = await Buyers.findOne({ where: { cpf: buyers[i].cpf } });
      // Creates the buyer if cant find the informed CPF
      if (!buyer) {
        buyer = await Buyers.create({
          first_name: buyers[i].first_name,
          last_name: buyers[i].last_name,
          email: buyers[i].email,
          cpf: buyers[i].cpf,
          birth_date: buyers[i].birth_date,
          sex: buyers[i].sex,
        });
      }

      for (let y = 0; y < buyers[i].tickets.length; y++) {
        let { baggage, flight_id, flight_class_id } = buyers[i].tickets[y];

        // Finds the flight class
        let actualFlight = await flights.findOne({ where: { id: flight_id } });

        // Finds the flight class
        let flightClass = await flightsClasses.findOne({
          where: { id: flight_class_id },
        });

        let ticketPrice = flightClass.price_per_seat;

        // Creates baggage if it has one
        if (baggage === 2) {
          baggage = await Baggage.create({
            identification: 'teste',
            baggage_fee: true,
          });
          // Adds 10% to the price if it has baggage fee (status = 2)
          ticketPrice = (ticketPrice * 1.1).toFixed(2);
        } else if (baggage === 1) {
          baggage = await Baggage.create({
            identification: 'teste',
            baggage_fee: false,
          });
        } else if (baggage === 0) {
          baggage = undefined;
        }

        // Ticket creating
        await Tickets.create({
          price: ticketPrice,
          buyer_id: buyer.id,
          baggage_id: baggage.id,
          flight_id,
          flight_classes_id: flight_class_id,
        });

        // Updating Seats availible in Flight Class
        await flightsClasses.update(
          { seats_availible: flightClass.seats_availible - 1 },
          { where: { id: flight_class_id } }
        );
        // Updating Seats availible in Flight
        await flights.update(
          { seats_availible: actualFlight.seats_availible - 1 },
          { where: { id: flight_id } }
        );
      }
    }
    res.sendStatus(200);
    return;
  }
}

module.exports = new TicketController();
