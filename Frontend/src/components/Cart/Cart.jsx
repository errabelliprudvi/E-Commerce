
import styles from './cart.module.css'
import pex from '../../assets/pex.jpg'
import { Button } from '@mui/material'
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useUser } from '../../UserProvider';
import RazorpayCheckout from '../Razorpay/RazorpayCheckOut';
export default function Cart({userId})
{

   // const { userId } = useParams(); // Extract the product ID from the URL
    //const  userId = localStorage.getItem('userId')
    console.log(userId)
    const{user,setItemsInCart} =useUser();
    const [items, setCartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const[total,setTotal]  = useState(0);
    const [checkOut,setcheckOut] = useState(false);
    const [paymentStatus,setPaymentStatus] = useState(null);
    //const [selectedCategory, setSelectedCategory] = useState(null); // State for selected category
   // const [products, setProducts] = useState([]); // State for products of selected category
     

//..............................................................//................................//................

//...............................................................//..................................//..........


   const fetchData = async () => {
    try {
      const response = await fetch(`/api/cart/${userId}`); // API endpoint
      if (!response.ok) {
        if (response.status == 404) {
          throw new Error('Your Cart is Empty...');
        }
      }
      const result = await response.json();
      setCartData(result.items);
      setItemsInCart(result.items.length || 0);

      // Calculate the total price
      const calculatedTotal = result.items.reduce((sum, item) => 
        sum + item.product.price * item.quantity, 0);
      setTotal(calculatedTotal);

      console.log(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    
  
    fetchData();
  }, [userId]); // Ensure it runs when userId changes
  
  
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
          const response = await fetch('/api/orders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                
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
                  
            }),
          });
    
          if (!response.ok) {
            throw new Error('Failed to place the order');
          }
    
          const res = await response.json();
          console.log(res); // Update local cart state with the response
          clearCart()
        } catch (error) {
          console.error('Error placing the order:', error.message);
        }
      };
    

      const handleRemoveFromCart = async (item) => {
        try {
          const response = await fetch('api/cart/item', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId, // Assuming userId is available in scope
              product: item, // Pass the item/product ID
            }),
          });
      
          if (!response.ok) {
            const errorData = await response.json(); // Attempt to parse API error details
            throw new Error(errorData.message || 'Failed to remove item from cart');
          }
      
          const res = await response.json();
          console.log('Item removed successfully:', res.cart.items);
         // setCartData(res.cart.items); // Update cart state
         fetchData()
        } catch (error) {
          console.error('Error while removing the item from cart:', error.message);
        }
      };
      
    


      const clearCart = async () => {
        try {
          const response = await fetch(`/api/cart/${userId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              // If your API requires an auth token:
              // 'Authorization': `Bearer ${token}`,
            },
          });
      
          if (!response.ok) {
            throw new Error('Failed to clear the cart');
          }
      
          const data = await response.json();
          setCartData([])
          setItemsInCart(0)
          console.log('cart  cleared successfully:', data);
        } catch (error) {
          console.error('Error  clearing cart:', error.message);
        }
      };
      
      // Usage
     // deleteUser('12345'); // Replace '12345' with the actual user ID
      





  
    if (loading) return <div>Loading...</div>;
    if (error) return <div><h3>{error}</h3> </div>;
    
    if(checkOut) return <div>
      <RazorpayCheckout setPaymentStatus={setPaymentStatus} total ={total}/>
    </div>
    

    //const items =[{id:"spr123",img:pex,name:"Iphone 16 pro",price:150 ,qnt:2},{id:"spr123",img:pex,name:"Iphone 16 pro",price:150 ,qnt:2},{id:"spr123",img:pex,name:"Iphone 16 pro",price:150 ,qnt:2}]
    return (
      <div className={styles.mainCnt}>
        <div className={styles.itemsListCnt}>
          {items.map((item) => (
            <div className={styles.itemCnt} key={item.product._id}>
              <div className={styles.imgCnt}>
                <img
                  className={styles.img}
                  src={`/images/cart/${item.product.images[0]}`}
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
              <Button onClick={() => setcheckOut(true)}>Check Out</Button>
              <h2>Total: ₹ {total}</h2>
            </>
          )}
        </div>
      </div>
    );
    }

    //handleBuyNow(items)