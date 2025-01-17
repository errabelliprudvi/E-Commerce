import pex from '../../assets/pex.jpg';
import cam from '../../assets/cam.jpg';
import stu from '../../assets/stu.jpg';
import styles from './popularProducts.module.css';
import { useUser } from '../../UserProvider';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../api';
const BASE_URL_IMAGE = import.meta.env.VITE_IMAGE_URL;

export default function PopularProducts({products}) {
    const {setItemsInCart,user} = useUser();
     const navigate = useNavigate();

    const handleAddToCart = async (item) => {
       if (user) {
         try {
           const response = await addToCart({
                                           userId: user,
                                           product: item,
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
     const handleClickImg = (id) => {
        console.log("Button clicked!");
       navigate(`/product/${id}`);
      };

    return (
        <div className={styles.mainCnt}>
            <div className={styles.heading}>Popular Products</div>
            <div className={styles.listCnt}>
                {products.map((item, index) =>{ 
                     const { _id, name, description, images, category } = item;
                  return  (
                    <div key={index} className={styles.imgCnt} >
                        <img src={`${BASE_URL_IMAGE}/images/${category}/${name}/${images[0]}`} alt={`Product ${index}`} onClick={()=>handleClickImg(_id)} />
                        <div className={styles.btn} onClick={()=>handleAddToCart(_id)}>Add to Cart</div>
                    </div>
                )})}
            </div>
        </div>
    );
}
