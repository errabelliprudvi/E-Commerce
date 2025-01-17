
import { useState, useEffect } from 'react' 
import styles from './shop.module.css'
import {getCategories,getProductsByCategory} from '../../api'

const BASE_URL_IMAGE = import.meta.env.VITE_IMAGE_URL ||'';

export default function Category({setProducts}){

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await getCategories(); 
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
    setSelectedCategory(categoryId); 
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
                                        <img className={styles.img}src={`${BASE_URL_IMAGE}/images/categories/${item.image}`}/>
                                        
                                </div>
                                <div className={styles.catName}> {item.name}</div>

                </div>
                     
                    
                ) )}
            </div>
        </div>
    )
}