const {
    initPayment, ipn
} = require('../controllers/paymentController');
const authorize = require('../middlewares/authorize');

const router = require('express').Router();

router.route('/')
    .get(authorize, initPayment);

router.route('/ipn')
    .post(ipn);


module.exports = router;
