const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');

// Initialize router
const router = express.Router();
const key_id = process.env.RKEY_ID;
const key_secret =process.env.RSECRET;
// Razorpay Instance
const razorpay = new Razorpay({
    key_id: `${key_id}`,
    key_secret: `${key_secret}`
});

// Route to Create an Order
router.post('/createOrder', async (req, res) => {
    try {
        const { amount, currency } = req.body;
        const order = await razorpay.orders.create({
            amount: amount * 100, // Amount in paise (multiply by 100 to convert INR to paise)
            currency: currency || 'INR',
            receipt: `receipt_${Math.random().toString(36).substring(2, 15)}`,
        });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create order', error });
    }
});

// Route to Verify Payment
router.post('/verifyPayment', async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const generatedSignature = crypto
            .createHmac('sha256', `${process.env.RSECRET}`) // Replace with your Razorpay Key Secret
            .update(razorpay_order_id + '|' + razorpay_payment_id)
            .digest('hex');

        if (generatedSignature === razorpay_signature) {
            const payment = await razorpay.payments.fetch(razorpay_payment_id);

            res.status(200).json({ message: 'Payment verified successfully' });
        } else {
            res.status(400).json({ message: 'Invalid payment signature' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Payment verification failed', error });
    }
});

module.exports = router;
