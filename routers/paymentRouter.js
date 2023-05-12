const {
    initPayment,
    ipn
} = require('../controllers/paymentController');
const authorize = require('../middlewares/authorize');

const router = require('express').Router();

router.route('/')
    .get(authorize, initPayment);

router.route('/ipn')
    .post(ipn);

router.route('/success')
    .post((req, res) => {
        res.redirect('http://localhost:3000/payment/success');
    });

router.route('/cancel')
    .post((req, res) => {
        res.redirect('http://localhost:3000/payment/cancel');
    });

router.route('/fail')
    .post((req, res) => {
        res.redirect('http://localhost:3000/payment/fail');
    });

module.exports = router;
