const mongoose = require('mongoose')
//const { addressSchema } = require('./userSchema');

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  country: { type: String, required: true },
});


const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    shippingAddress: { type: addressSchema, required: true },
    paymentMethod: { type: String, required: true },
    paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
    orderStatus: { type: String, enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' },
    totalPrice: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
  });
  
  module.exports = mongoose.model('Order', orderSchema);
  