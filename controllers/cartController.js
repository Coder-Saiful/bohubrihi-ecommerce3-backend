const { Cart } = require('../models/cart');
const _ = require('lodash');

// add to cart 
module.exports.createCart = async (req, res) => {
    const {price, product} = _.pick(req.body, ["price", "product"]);
    const userId = req.user._id;
    let cartItem = await Cart.findOne({
        user: userId,
        product: product
    });

    if (cartItem) {
        return res.status(400).send({message: "Cart item already exists in cart!"});
    } else {
        cartItem = new Cart({product: product, price: price, user: userId});
        const result = await cartItem.save();
        return res.status(201).send({
            message: "Added to cart successfully!",
            data: result
        });
    }
}

// get all the cart item
module.exports.getCart = async (req, res) => {
    const userId = req.user._id;
    const cartItems = await Cart.find({
        user: userId
    })
        .populate('product', 'name')
        .populate('user', 'name');
    return res.status(200).send(cartItems);
}

// cart item update
module.exports.updateCart = async (req, res) => {
    const {_id, count} = _.pick(req.body, ["_id", "count"]);
    const userId = req.user._id;
    await Cart.updateOne({ user: userId, _id: _id }, {count: count});
    return res.status(200).send({message: "Your cart item updated!"});
}

// cart item delete
module.exports.deleteCart = async (req, res) => {
    const cartItemId = req.params.id;
    const userId = req.user._id;
    await Cart.deleteOne({
        user:userId,
        _id: cartItemId
    });
    return res.status(200).send({message: "Your cart item removed!"});
}