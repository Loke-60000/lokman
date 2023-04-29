import React from 'react';
import CarouselComponent from '../components/Carousel';

const Introduction = () => {
  const carouselImages = [
    {
      src: 'https://via.placeholder.com/900x200',
      alt: 'First slide',
      caption: 'insert text 1',
    },
    {
      src: 'https://via.placeholder.com/900x200',
      alt: 'Second slide',
      caption: 'insert text 2',
    },
    {
      src: 'https://via.placeholder.com/900x200',
      alt: 'Third slide',
      caption: 'insert text 3',
    },
  ];

  return (
    <div>
      <CarouselComponent images={carouselImages} />
      <hr />
      <div className="bio-container">
        <h2>Lorem</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          ullamcorper, risus ut facilisis tincidunt, justo sapien bibendum
          ligula, ac cursus odio ligula in justo. Cras facilisis dui ut sem
          feugiat, ut egestas orci aliquet. Aenean fringilla neque eget nibh
          ullamcorper tempus. Proin et sollicitudin mi, id tempor sapien.
        </p>
      </div>
    </div>
  );
};

export default Introduction;
