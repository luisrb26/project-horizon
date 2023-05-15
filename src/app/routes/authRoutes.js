const router = require('express').Router();

const validate = require('../validations/authValidations');

const authController = require('../controllers/AuthController');

router.post('/', validate.createAdmin, authController.createAdmin);

module.exports = router;
