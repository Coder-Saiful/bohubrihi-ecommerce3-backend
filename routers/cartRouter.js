const router = require('express').Router();
const { createCart, getCart, updateCart, deleteCart } = require('../controllers/cartController');
const authorize = require('../middlewares/authorize');

router.route('/')
    .post(authorize, createCart)
    .get(authorize, getCart)
    .put(authorize, updateCart);

router.route('/:id')
    .delete(authorize, deleteCart);

module.exports = router;