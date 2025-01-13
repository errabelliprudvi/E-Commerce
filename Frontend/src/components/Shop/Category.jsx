
import { useState, useEffect } from 'react' 
import { Button } from '@mui/material'
import pex from '../../assets/pex.jpg'
import cam from '../../assets/cam.jpg'
import stu from '../../assets/stu.jpg'
import styles from './shop.module.css'
import {getCategories,getProductsByCategory} from '../../api'
export default function Category({setProducts}){

  //const data = [{img:stu,name:'Mens'},{img:pex,name:'Women'},{img:cam,name:'Jeans'},{img:stu,name:'Children'}]
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState(null); // State for selected category
  //const [products, setProducts] = useState([]); // State for products of selected category


  useEffect(() => {
    // Replace with your API endpoint
    const fetchData = async () => {
      try {
        const categories = await getCategories(); // API endpoint
        setData(categories);
        console.log(categories)
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleCategoryClick = async (categoryId) => {
    console.log(categoryId)
    setSelectedCategory(categoryId); // Set the selected category
    // Fetch products for the selected category
    try {
      const productsData = await getProductsByCategory(categoryId);
      setProducts(productsData);
      console.log(productsData)
    } catch (error) {
      setError(error.message);
    }
  };




  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


    return(

        <div className={styles.mainCnt}>
            
            <div className={styles.listCnt}>
            {data.map((item)=>(
                <div   key={item._id} className={styles.catCnt}>
                                <div  
                                className={`${styles.imgCnt} ${selectedCategory === item.name ? styles.selectedCategory : ''}`}
                                onClick={() => handleCategoryClick(item._id)} >
                                        <img className={styles.img}src={`/images/categories/${item.image}`}/>
                                        
                                </div>
                                <div className={styles.catName}> {item.name}</div>

                </div>
                     
                    
                ) )}
            </div>
        </div>
    )
}