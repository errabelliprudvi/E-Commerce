

import React, { useState, useEffect } from 'react';
import './AutoSlideBanner.css';  // Import the CSS file
import image from '../assets/react.svg'

const AutoSlideBanner = () => {
  // Step 1: Define the state for the active slide
  const [currentSlide, setCurrentSlide] = useState(0);

  // Step 2: Array of images for the banner
  const images = [
    image,image,image
  ];

  // Step 3: Set up auto-slide logic using `useEffect`
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);  // Move to the next slide
    }, 3000);  // Change slide every 3 seconds (3000ms)

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [images.length]);


 // Step 4: Function to handle indicator click
 const handleIndicatorClick = (index) => {
  setCurrentSlide(index);
};

  return (
    <>
    <div className="banner-container">
      <div className="banner-slide" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {images.map((image, index) => (
          <img key={index} src={image} alt={`slide-${index}`} className="banner-image" />
        ))}
      </div>
    
     

    <div className="banner-indicators">
     {images.map((_, index) => (
       <div
         key={index}
         className={`indicator ${currentSlide === index ? 'active' : ''}`}
         onClick={() => handleIndicatorClick(index)}  // Make indicators clickable
       />
     ))}
   </div>
   </div>

 </>
  );
};

export default AutoSlideBanner;
