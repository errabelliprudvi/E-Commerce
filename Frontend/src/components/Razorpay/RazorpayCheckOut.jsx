// RazorpayCheckout.jsx
import React, { useState } from 'react';
import { useEffect } from 'react';

const RazorpayCheckout = ({setPaymentStatus, total}) => {
  //const [loading, setLoading] = useState(false);

  // Function to load Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Function to create the order and initiate Razorpay payment
  const handlePayment = async () => {


    // Call your backend to create an order
    const response = await fetch('/api/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount:total, // Amount in paise (₹500.00)
      }),
    });

    if (!response.ok) {
      alert('Failed to create order');
      
      return;
    }

    const order = await response.json();
    console.log(order);
    //const { orderId } = data.id; // Get the orderId from the backend response

    // Load Razorpay script if not already loaded
    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      alert('Failed to load Razorpay SDK. Please check your connection.');
      
      return;
    }

    const options = {
      key: 'rzp_test_a6FSh538GCokzj', // Your Razorpay key
      amount: order.amount, // Amount in paise (₹500.00)
      currency: order.currency,
      name: 'Your Company Name',
      description: 'Test Transaction',
      order_id: order.id, // Use the order_id returned by backend
     /* handler: function (response) {
        console.log('Payment successful:', response);
        alert(`Payment ID: ${response.razorpay_payment_id}`);
      },*/
      handler: function (response) {
        console.log('Payment successful:', response);
       // alert(`Payment ID: ${response.razorpay_payment_id}`);
      
        // Send payment details to backend for verification
         fetch('/api/verify-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.message === 'Payment verified successfully') {
                setPaymentStatus("SUCCESS");
              alert('Payment verified successfully!');
            } else {
                setPaymentStatus("FAILD");
              alert('Payment verification failed!');
            }
          })
          .catch((error) => {
            console.error('Error verifying payment:', error);
            alert('An error occurred while verifying payment');
          });
      },
      


      prefill: {
        name: 'Customer Name',
        email: 'customer@example.com',
        contact: '9999999999',
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    
  };
useEffect(() => {
    handlePayment();
  }, []);
  return (
    <div>
    
    </div>
  );
};

export default RazorpayCheckout;

//  <button onClick={handlePayment} style={{ padding: '10px 20px', fontSize: '16px' }} disabled={loading}>
//{loading ? 'Loading...' : 'Pay Now'}
//</button>