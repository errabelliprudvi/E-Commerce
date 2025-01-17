import { alertClasses, Button } from "@mui/material";
import styles from './product.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useUser } from "../../UserProvider";
import { getProductById, addToCart, placeOrder } from '../../api';
import RazorpayCheckout from "../Razorpay/RazorpayCheckOut";

const BASE_URL_IMAGE = import.meta.env.VITE_IMAGE_URL ||'';

export default function Product() {
  const { user, fetchNumberOfItemsInCart, setItemsInCart } = useUser();
  const { id } = useParams(); // Extract the product ID from the URL
  const navigate = useNavigate();
  const [product, setProductDetails] = useState(null); // Initially null
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors
  const [buyNow,setBuyNow] =useState(false);
  const [paymentStatus,setPaymentStatus] = useState(null);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getProductById(id);
        setProductDetails(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]); // Re-run effect if `id` changes

  const handleAddToCart = async (item) => {
    if (user) {
      try {
        const response = await addToCart({
                                        userId: user,
                                        product: item._id,
                                        quantity: 1
                                      });
        setItemsInCart(response.cart.items.length || 0);
      } catch (error) {
        console.error('Error adding to cart:', error.message);
      }
    } else {
      navigate("/login");
    }
  };

  const handleBuyNow = async () => {
    if (user) {
      const items = [{
        product: product._id,
        price: product.price,
        quantity: 1
      }];
  
      try {
        
        const res = await placeOrder({
                                      user,
                                      items,
                                      shippingAddress: {
                                        street: "123 Main Street",
                                        city: "Springfield",
                                        state: "Illinois",
                                        zip: "62704",
                                        country: "USA"
                                      },
                                      paymentMethod: "Credit Card"
                                    });
        alert('Order Placed Successfully!');
        
      } catch (error) {
        console.error('Error placing the order:', error.message);
      }
    }
    else
    {
      navigate("/login");
      return;
    }
    
  };

  if (loading) return <div>Loading...</div>; // Show loading indicator
  if (error) return <div>Error: {error}</div>; // Show error message

  if (buyNow) {
    if (paymentStatus === "SUCCESS") {
      // Reset states and refetch data after successful payment
      
      // Refetch cart data to show updated state
      handleBuyNow(); // Optionally clear the cart after payment
      setBuyNow(false);
      return <h3>Payment successful! Your cart has been updated.</h3>;
    }
  
    if (paymentStatus === "FAILED") {
      setBuyNow(false); // Exit checkout flow
      return <h3>Payment failed. Please try again.</h3>;
    }
  
    return (
      <div>
        <RazorpayCheckout setPaymentStatus={setPaymentStatus} total={product.price} setCloseState={setBuyNow} />
      </div>
    );
  }
  

  // Show product details only after loading is complete
  return product && (
    <div className={styles.mainCnt}>
      <div className={styles.cardCnt}>
        <div className={styles.imgCnt}>
          <img
            className={styles.img}
            src={product.images && product.category ? `${BASE_URL_IMAGE}/images/${product.category}/${product.name}/${product.images[0]}` : '/images/default-product.png'}
            alt={product.name || 'Product Image'}
          />
        </div>
        <div className={styles.cardDetailCnt}>
          <h3>Product Name: {product.name}</h3>
          <h3>Price: {product.price}</h3>
          <h3>Stock: {product.stock}</h3>
        </div>
      </div>

      <div className={styles.hdrCnt}><h2>Product Information</h2></div>
      <div className={styles.specsCnt}>
        {product.description}
      </div>
      <div className={styles.cartCnt}>
        <div className={styles.chart}>Size</div>
        <div className={styles.quantity}>Quantity</div>
        <div className={styles.cart}>
          <Button onClick={()=> {user?setBuyNow(true):navigate("/login")}} variant="contained">Buy Now</Button>
          <Button onClick={() => handleAddToCart(product)} variant="contained">Add To Cart</Button>
        </div>
      </div>
    </div>
  );
}
