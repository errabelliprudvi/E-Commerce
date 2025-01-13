
import { useState, useEffect } from 'react' 
import { Button } from '@mui/material'
import pex from '../../assets/pex.jpg'
import cam from '../../assets/cam.jpg'
import stu from '../../assets/stu.jpg'
import styles from './shop.module.css'
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
        const response = await fetch('/api/category'); // API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
        console.log(result)
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
      const response = await fetch(`/api/products/category/${categoryId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const productsData = await response.json();
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
                                onClick={() => handleCategoryClick(item.name)} >
                                        <img className={styles.img}src={`/images/categories/${item.name}.jpg`}/>
                                        
                                </div>
                                <div className={styles.catName}> {item.name}</div>

                </div>
                     
                    
                ) )}
            </div>
        </div>
    )
}