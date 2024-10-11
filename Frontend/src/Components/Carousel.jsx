import { useState, useRef } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import scout01 from '../assets/images/scout1.jpg';
import scout02 from '../assets/images/scout02.jpg';
import scout03 from '../assets/images/scout03.jpg';

const CarouselComponent = () => {
  const [autoPlay, setAutoPlay] = useState(true);
  const carouselRef = useRef(null);

  const handleImageClick = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
    setTimeout(() => setAutoPlay(true), 3000);
  };

  const imageStyle = {
    height: '500px',
    objectFit: 'cover', 
  };
  

  return (
    <Carousel 
      showThumbs={false} 
      infiniteLoop 
      autoPlay={autoPlay} 
      interval={3000} 
      showStatus={false}
      ref={carouselRef}
    >
      <div onClick={handleImageClick}>
      <img 
            src={scout01} 
            alt="Slide 1" style={imageStyle}
      />
      </div>
      <div onClick={handleImageClick}>
      <img 
            src={scout02} 
            alt="Slide 2" style={imageStyle}
      />
      </div>
      <div onClick={handleImageClick}>
      <img 
            src={scout03} 
            alt="Slide 3" style={imageStyle}
      />
      </div>
    </Carousel>
  );
};

export default CarouselComponent;
