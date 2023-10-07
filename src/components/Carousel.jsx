import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const CarouselComponent = ({ images }) => {
  return (
    <Carousel className="custom-carousel"> {/* Add the custom-carousel class */}
      {images.map((image, index) => (
        <Carousel.Item key={index}>
          <a href={image.link} target="_blank" rel="noopener noreferrer"> {/* Add this line */}
            <img className="d-block w-100" src={image.src} alt={image.alt} />
          </a>
          {image.caption && (
            <Carousel.Caption>
              <h3>{image.caption}</h3>
            </Carousel.Caption>
          )}
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
