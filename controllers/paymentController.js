const {
    PaymentSession
} = require('ssl-commerz-node');
const {Cart} = require('../models/cart');
const {Profile} = require('../models/profile');

module.exports.initPayment = async (req, res) => {
    const payment = new PaymentSession(true, process.env.SSL_COMMERZ_STORE_ID, process.env.SSL_COMMERZ_STORE_PASSWORD);

    const userId = req.user._id;
    const cartItems = await Cart.find({user: userId})
        .populate('product', 'name');
    
    const total_amount = cartItems.map(item => item.count * item.price)
        .reduce((a, b) => a + b, 0);
    
    const tran_id = "_" + Math.random().toString(36).substr(2, 9) + (new Date().getTime());
    
    const profile = await Profile.findOne({user: userId});
    const {phone, address1, address2, city, state, postcode, country} = profile;
    
    const total_item = cartItems.map(item => item.count)
        .reduce((a, b) => a + b, 0);
    
    const product_name = cartItems.map(item => item.product.name)
        .join(',');

    // Set the urls
    payment.setUrls({
        success: "yoursite.com/success", // If payment Succeed
        fail: "yoursite.com/fail", // If payment failed
        cancel: "yoursite.com/cancel", // If user cancel payment
        ipn: "yoursite.com/ipn", // SSLCommerz will send http post request in this link
    });

    // Set order details
    payment.setOrderInfo({
        total_amount: total_amount, // Number field
        currency: "BDT", // Must be three character string
        tran_id: tran_id, // Unique Transaction id
        emi_option: 0, // 1 or 0
    });

    // Set customer info
    payment.setCusInfo({
        name: req.user.name,
        email: req.user.email,
        add1: address1,
        add2: address2,
        city: city,
        state: state,
        postcode: postcode,
        country: country,
        phone: phone,
        fax: phone,
    });

    // Set shipping info
    payment.setShippingInfo({
        method: "Courier", //Shipping method of the order. Example: YES or NO or Courier
        num_item: total_item,
        name: req.user.name,
        add1: address1,
        add2: address2,
        city: city,
        state: state,
        postcode: postcode,
        country: country,
    });

    // Set Product Profile
    payment.setProductInfo({
        product_name: product_name,
        product_category: "General",
        product_profile: "general",
    });

    const response = await payment.paymentInit();
    return res.status(200).send(response);
}