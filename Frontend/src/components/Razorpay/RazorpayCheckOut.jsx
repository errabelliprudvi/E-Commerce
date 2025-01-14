
import React, { useState } from 'react';
import { useEffect } from 'react';

const RazorpayCheckout = ({setPaymentStatus, total, setCloseState}) => {
  
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  
  const handlePayment = async () => {


    const response = await fetch('/api/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount:total, 
      }),
    });

    if (!response.ok) {
      alert('Failed to create order');
      
      return;
    }

    const order = await response.json();
    console.log(order);
    
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
      order_id: order.id, 
      handler: function (response) {
        console.log('Payment successful:', response);
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
              //alert('Payment verified successfully!');
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
      modal: {
        ondismiss: function() {
          // This is triggered when the Razorpay widget is closed
          console.log('Razorpay widget closed by the user');
          setCloseState(false);
          // You can make an API call here to track the user closure if needed
        }
      }
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
