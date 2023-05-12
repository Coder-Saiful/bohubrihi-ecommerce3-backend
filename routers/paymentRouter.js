const {
    initPayment,
    ipn
} = require('../controllers/paymentController');
const authorize = require('../middlewares/authorize');

const router = require('express').Router();
const url = 'http://localhost:3000/payment';

router.route('/')
    .get(authorize, initPayment);

router.route('/ipn')
    .post(ipn);

router.route('/success')
    .post((req, res) => {
        res.redirect(`${url}/success`);
    });

router.route('/cancel')
    .post((req, res) => {
        res.redirect(`${url}/cancel`);
    });

router.route('/fail')
    .post((req, res) => {
        res.redirect(`${url}/fail`);
    });

module.exports = router;
