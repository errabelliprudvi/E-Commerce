import { Button } from "@mui/material";
import styles from './product.module.css'
import cam from '../../assets/pex.jpg'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useUser } from "../../UserProvider";

export default function Product()
{
   // const product= {id:'spr143',image:cam,title:"Android Phone",price:"$ 150",seller:'Grospr',info:"Best Android mobile phone in the market"}
    const{user,fetchNumberOfItemsInCart,setItemsInCart} =useUser()
    const { id } = useParams(); // Extract the product ID from the URL
    //const  userId = localStorage.getItem('userId')

    const [product, setProductDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const [selectedCategory, setSelectedCategory] = useState(null); // State for selected category
   // const [products, setProducts] = useState([]); // State for products of selected category
     
    useEffect(() => {
      // Replace with your API endpoint
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/products/${id}`); // API endpoint
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const result = await response.json();
          setProductDetails(result);
          console.log(result)
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
  
    


    const handleAddToCart = async (item) => {
        console.log(item._id)
        try {
          const response = await fetch('/api/cart', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              "userId": user,
              "product": item._id,
              "quantity": 1
            }),
          });
    
          if (!response.ok) {
            throw new Error('Failed to add item to cart');
          }
    
          const updatedCart = await response.json();
          console.log(updatedCart.cart.items); // Update local cart state with the response
          setItemsInCart(updatedCart.cart.items.length||0)
          //fetchNumberOfItemsInCart()
        } catch (error) {
          console.error('Error adding to cart:', error.message);
        }
      };
    
    

      const handleBuyNow = async () => {
        
        const items =[{}]
        
        
            items[0] ={"product":product._id,
                            "price":product.price,
                            "quantity":1

            }
        
        try {
          const response = await fetch('/api/orders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                
                    "user": user,
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
            throw new Error('Failed to add item to cart');
          }
    
          const res = await response.json();
          console.log(res); // Update local cart state with the response
        } catch (error) {
          console.error('Error adding to cart:', error.message);
        }
      };
    

    


      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error: {error}</div>;
      

    return(
        <div className={styles.mainCnt}>
            <div className={styles.cardCnt}>
                <div className={styles.imgCnt}>  
                <img 
  className={styles.img} 
  src={product.images && product.category ? `/images/${product.category}/${product.images[0]}` : '/images/placeholder.jpg'} 
  alt={product.name || 'Product Image'} 
/>

                </div>
                <div className={styles.cardDetailCnt}>
                   <h3>Product Name: {product.name}</h3> 
                   <h3>Price:{product.price}</h3> 
                   <h3>Stock:{product.stock}</h3> 
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
                    <Button onClick={()=>handleBuyNow()} variant="contained">Buy Now</Button>
                    <Button onClick={()=>handleAddToCart(product)} variant="contained"> Add To Cart</Button>
                </div>
            </div>
        </div>
    )
}