// importando os pacotes para uso no arquivo index.js
const express = require('express');
const cors = require('cors');
const app = express(cors({ origin: true }));
const db = require('./src/app/db/conn');
require('dotenv').config();

// Carregando configurações para o express
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const port = process.env.PORT;

// IMPORTAÇÃO DE ROTAS
const airportRoutes = require('./src/app/routes/airportRoutes');
const flightRoutes = require('./src/app/routes/flightRoutes');
const ticketRoutes = require('./src/app/routes/ticketRoutes');
const authRoutes = require('./src/app/routes/authRoutes');

db.sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    useRoutes();
    app.listen(port, () =>
      console.log(`[server 🖥️  ] App rodando em: http://localhost:${port}`)
    );
  })
  .catch((err) => console.log(err));

// USO DE ROTAS
function useRoutes() {
  console.log('[server 🖥️  ] Importing Routes...');
  app.use('/airports', airportRoutes);
  app.use('/flights', flightRoutes);
  app.use('/tickets', ticketRoutes);
  app.use('/auth', authRoutes);
}
