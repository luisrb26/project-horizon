const db = require('../db/conn');
const bcrypt = require('bcrypt');

// MODELS
const Manager = db.managers;

class AuthController {
  async createAdmin(req, res) {
    const { username, password } = req.body;

    // Encrypting user password
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(password, 12, function (err, hash) {
        if (err) reject(err);
        resolve(hash);
      });
    });

    await Manager.create({ username, password: hashedPassword });
    res.status(200).json({ msg: 'User created' });
  }
  async login(req, res) {}
}

module.exports = new AuthController();
