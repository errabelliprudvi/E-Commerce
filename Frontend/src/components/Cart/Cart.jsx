import styles from './cart.module.css';
import pex from '../../assets/pex.jpg';
import { Button } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useUser } from '../../UserProvider';
import RazorpayCheckout from '../Razorpay/RazorpayCheckOut';
import { clearUserCart, getProductById, getUserCart, placeOrder, removeFromCart } from '../../api';

const BASE_URL_IMAGE = import.meta.env.VITE_IMAGE_URL ||'';

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
      
      const result = await getUserCart(userId);
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



  const handleBuyNow = async (item) => {
        
            const items =[{}]
            item.map((ite,index)=>
            (
                items[index] ={"product": ite.product._id,
                                "price":ite.product.price,
                                "quantity":ite.quantity

                                }
            )
            );
    try {
      const res = await placeOrder({ 
                                    "user": userId,
                                    "items": items,
                                    "shippingAddress": {
                                    "street": "123 Main Street",
                                    "city": "Springfield",
                                    "state": "Illinois",
                                    "zip": "62704",
                                    "country": "USA"
                                    },
                                    "paymentMethod": "Credit Card"
                                          
                                    });
      console.log(res); // Update local cart state with the response
      alert(res.message)
      clearCart()
    } catch (error) {
      console.error('Error placing the order:', error.message);
    }
  };

  const clearCart = async () => {
    try {
      const data = await clearUserCart(userId);
      setCartData([])
      setItemsInCart(0)
      console.log('cart  cleared successfully:', data);
    } catch (error) {
      console.error('Error  clearing cart:', error.message);
    }
  };
  


  const handleRemoveFromCart = async (itemId) => {
    try {
      // Call API to remove the item
      const res = await removeFromCart({ userId, product: itemId });
  
      // Update cart data in state
      setCartData(prevData => prevData.filter(item => String(item.product._id) !== String(itemId)));
  
      // Update cart count
      setItemsInCart(prev => Math.max(prev - 1, 0)); // Ensure non-negative count
    } catch (error) {
      console.error('Error removing item:', error.message);
      alert('Failed to remove item from cart. Please try again.');
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
                src={`${BASE_URL_IMAGE}/images/${products[item.product._id]?.category || 'default'}/${item.product.name}/${item.product.images[0]}`}
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
