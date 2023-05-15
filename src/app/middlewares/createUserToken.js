const jwt = require('jsonwebtoken');
const { Op, UniqueConstraintError } = require('sequelize');
require('dotenv').config();

const key = process.env.JWT_KEY;

module.exports = async (user) => {
  const dataExpiracao = new Date(
    // Tpken expires in 16h
    Date.now() + parseInt(16) * 60 * 60 * 1000
  );

  // Criando token
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      expires_in: dataExpiracao,
    },
    key
  );

  return token;
};
