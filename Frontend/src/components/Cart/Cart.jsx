import styles from './cart.module.css';
import pex from '../../assets/pex.jpg';
import { Button } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useUser } from '../../UserProvider';
import RazorpayCheckout from '../Razorpay/RazorpayCheckOut';
import { getProductById } from '../../api';

export default function Cart({ userId }) {
  const { user, setItemsInCart } = useUser();
  const [items, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [checkOut, setCheckOut] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [products, setProducts] = useState({});

  const fetchProducts = async () => {
    try {
      const productPromises = items.map(item =>
        getProductById(item.product._id).then(prod => ({
          [item.product._id]: prod
        }))
      );
      const productData = await Promise.all(productPromises);
      const productsMap = productData.reduce((acc, curr) => ({ ...acc, ...curr }), {});
      setProducts(productsMap);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/cart/${userId}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Your Cart is Empty...');
        }
      }
      const result = await response.json();
      setCartData(result.items);
      setItemsInCart(result.items.length || 0);

      const calculatedTotal = result.items.reduce((sum, item) => 
        sum + item.product.price * item.quantity, 0);
      setTotal(calculatedTotal);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchData();
  }, [userId]);

  useEffect(() => {
    if (items.length) fetchProducts();
  }, [items]);

  const handleRemoveFromCart = async (itemId) => {
    try {
      const response = await fetch('api/cart/item', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, product: itemId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to remove item from cart');
      }

      setCartData(prevData => prevData.filter(item => item.product._id !== itemId));
      setItemsInCart(prev => prev - 1); // Update cart count
    } catch (error) {
      console.error('Error removing item:', error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div><h3>{error}</h3> </div>;

  if (checkOut) {
    if (paymentStatus === "SUCCESS") {
      handleBuyNow(items); // Optionally clear the cart after payment
      setCheckOut(false);
      return <h3>Payment successful! Your cart has been updated.</h3>;
    }
    if (paymentStatus === "FAILED") {
      setCheckOut(false);
      return <h3>Payment failed. Please try again.</h3>;
    }

    return <RazorpayCheckout setPaymentStatus={setPaymentStatus} total={total} setCloseState={setCheckOut} />;
  }

  return (
    <div className={styles.mainCnt}>
      <div className={styles.itemsListCnt}>
        {items.map((item) => (
          <div className={styles.itemCnt} key={item.product._id}>
            <div className={styles.imgCnt}>
              <img
                className={styles.img}
                src={`/images/${products[item.product._id]?.category || 'default'}/${item.product.name}/${item.product.images[0]}`}
                alt={item.product.name}
              />
            </div>
            <div className={styles.detailCnt}>
              <h3>Name: {item.product.name}</h3>
              <h3>Price: ₹ {item.product.price}</h3>
              <h3>Quantity: {item.quantity}</h3>
              <h3>Total: ₹ {item.product.price * item.quantity}</h3>
            </div>
            <div className={styles.rmCnt}>
              <Button onClick={() => handleRemoveFromCart(item.product._id)}>
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.checkoutCnt}>
        {items.length === 0 ? (
          <h2>
            Your Cart is Empty. Add Products to the Cart.. <Link to="/shop">Shop</Link>
          </h2>
        ) : (
          <>
            <Button onClick={() => setCheckOut(true)}>Check Out</Button>
            <h2>Total: ₹ {total}</h2>
          </>
        )}
      </div>
    </div>
  );
}
