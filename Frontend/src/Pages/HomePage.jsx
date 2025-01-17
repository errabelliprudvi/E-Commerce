import { useEffect } from "react";
import Banner from "../components/Home/Banner";
import FeaturedSection from "../components/Home/FeaturedSection";
import PopularProducts from "../components/Home/PopularProducts";

import { useUser } from "../UserProvider";




//console.log(fashion);

const Home =()=>{
    const {products} =useUser();
    const fashion = products.filter(product => product.category === "6789a3d0a344168db7c117f7");
    const electronics = products.filter(product => product.category === "6789a40ba344168db7c117fb");
   


  return ( <>
    
    <Banner/>
    <FeaturedSection  name="Fashion" products={fashion}/>
    <FeaturedSection  name="Electronics"  products={electronics}/>
    <PopularProducts  products={products}/>
    </>);

};

export default Home