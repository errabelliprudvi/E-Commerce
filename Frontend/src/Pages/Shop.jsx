import Header from "../components/Header"
import Category from "../components/Shop/Category"
import ProductsList from "../components/Shop/ProductsList"
import { useState } from "react"




const Shop =()=>

  {
    const [products, setProducts] = useState([]); // State for products of selected category

  return  (
        <>
       
        <Category setProducts={setProducts}/>
        <ProductsList items={products}/>
        </>
    )
    

  }

export default Shop