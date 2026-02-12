"use client";

import React from "react";
import { Carousel } from "react-bootstrap";

const CarouselComponent = ({ images }) => {
  return (
    <Carousel className="custom-carousel">
      {images.map((image, index) => (
        <Carousel.Item key={index}>
          <a href={image.link} target="_blank" rel="noopener noreferrer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="d-block w-100"
              src={image.src}
              alt={image.alt}
              width={1000}
              height={222}
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "low"}
            />
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
