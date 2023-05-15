const db = require('../db/conn');
const bcrypt = require('bcrypt');
const createUserToken = require('../middlewares/createUserToken');

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
  async login(req, res) {
    const { username, password } = req.body;

    const user = await Manager.findOne({ where: { username } });

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      res.status(422).json({ msg: 'Wrong password!' });
      return;
    }
    if (!user) {
      res.status(422).json({ msg: 'No user found!' });
      return;
    }

    const userToken = await createUserToken(user);

    res.status(200).json({
      message: 'You are authenticated',
      token: userToken.token,
      expires_in: userToken.expira_em,
      userId: user.id,
    });
  }
}

module.exports = new AuthController();
