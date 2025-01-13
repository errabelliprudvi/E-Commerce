import { Button } from "@mui/material";
import styles from './product.module.css'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useUser } from "../../UserProvider";
import {getProductById,addToCart} from '../../api'
 


export default function Product()
{
 
   // const product= {id:'spr143',image:cam,title:"Android Phone",price:"$ 150",seller:'Grospr',info:"Best Android mobile phone in the market"}
    const{user,fetchNumberOfItemsInCart,setItemsInCart} =useUser()
    const { id } = useParams(); // Extract the product ID from the URL
    //const  userId = localStorage.getItem('userId')
    const navigate = useNavigate();
    const [product, setProductDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const [selectedCategory, setSelectedCategory] = useState(null); // State for selected category
   // const [products, setProducts] = useState([]); // State for products of selected category
     
    useEffect(() => {
      // Replace with your API endpoint
      const fetchData = async () => {
        try {
          const result =  getProductById(id); 
          
          console.log(result);
          setProductDetails(result);

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
        if(!user)
        {
          try {
            const response = await addToCart({ 
              userId: user,
              product: item._id,
              quantity: 1})
            
            setItemsInCart(response.cart.items.length || 0);
          } catch (error) {
            console.error('Error adding to cart:', error.message);
          }
        }
        else
        {
          navigate("/login");
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