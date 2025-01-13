import styles from './header.module.css'
import img from '../assets/react.svg'
import ShoppingCartCheckoutSharpIcon from '@mui/icons-material/ShoppingCartCheckoutSharp';
import { blue, purple } from '@mui/material/colors';
import { Link } from "react-router-dom";
export default function Header(){
     const options =['Home','Shop','About Us' ,'Contact Us']
    return(
        <>
        <div className={styles.mainContainer}>
            <div className={styles.logoContainer}>
                <img src={img} width='60px' height='60px'/>
                <div>E-Commerce</div>
            </div>

            <div className={styles.optionsContainer}>
               <h2> <Link to="/">Home</Link></h2>
               <h2> <Link to="/shop">Shop</Link> </h2>
               <h2><Link to="/about">About Us</Link></h2>
               <h2><Link to="/product">Contact Us</Link></h2>
            
               
            </div>
            <div className={styles.logoContainer}> 
            <Link to="/user/orders/6738741d48a4b6b4bed3c298">
                <div className={styles.profileImg}>
                  
                </div>
                </Link>
                <div className={styles.cartContainer}>
               <Link to="/cart/6738741d48a4b6b4bed3c298"><ShoppingCartCheckoutSharpIcon  sx={{ fontSize: 40 }}/></Link> 
                </div>
            </div>
            
        </div>

        </>
    )
}