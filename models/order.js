const {Schema, model} = require('mongoose');
const { cartSchema } = require('./cart');

module.exports.Order = model('Order', new Schema({
    cartItems: [cartSchema],
    transaction_id: {
        type: String,
        unique: true
    },
    address: {
        phone: String,
        address1: String,
        address2: String,
        city: String,
        state: String,
        postcode: String,
        country: String
    },
    status: {
        type: String,
        enum: ["Pending", "Complete"],
        default: "Pending"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    sessionKey: String
}, {timestamps: true}));