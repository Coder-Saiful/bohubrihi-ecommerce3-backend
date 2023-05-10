const { initPayment } = require('../controllers/paymentController');
const authorize = require('../middlewares/authorize');

const router = require('express').Router();

router.route('/')
    .get(authorize, initPayment);

module.exports = router;