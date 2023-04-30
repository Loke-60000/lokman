import React from 'react';
import CarouselComponent from '../components/Carousel';
import Amadeus_icon from '../assets/images/amadeus.jpg'
import Rakugaki_icon from '../assets/images/rakugaki.jpg'

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
          <h2>About Me</h2>
          <p>
            Thank you for visiting my personal website! My name is Lokman RAMDANI, and I'm a 21-year-old web developer who's passionate about the digital world. After obtaining a literary baccalaureate and studying the Japanese language abroad, I made the decision to reorient my career and focus on the field of web development.
          </p>
          <h2>Education</h2>
          <ul>
            <li>2020: Baccalauréat Générale de Série L - Lycée George Clemenceau</li>
            <li>2021: Japanese Language Course (6 months) - Tokyo Galaxy, Tokyo, Japan</li>
            <li>2022-2023: Web Developer and Web Mobile Course - ADRAR</li>
            </ul>
            <h2>Work Experience</h2>
            <ul>
            <li>2021: Freelance Illustrator - Providing illustration services via the Fiverr platform.</li>
            <li>Mission Locale - Participated in an intensive program to facilitate education and employment opportunities.</li>
            </ul>
            <h2>Interests</h2>
            <ul>
            <li>Digital drawing (cartoon, manga)</li>
            <li>Computer technology (hardware and software)</li>
            <li>Social media activities: sharing illustrations, streaming</li>
            <li>Traveling: I've been to Japan and Germany.</li>
          </ul>
        </div>
        <hr />
        <div className="news-icons-wrapper">
          <div>
            <h1>News:</h1>
            <ul>
              <li>lorem</li>
              <li>lorem</li>
              <li>lorem</li>
              <li>lorem</li>
              <li>lorem</li>
              <li>lorem</li>
              <li>lorem</li>
              <li>lorem</li>
              <li>lorem</li>
              <li>lorem</li>
            </ul>
          </div>
          <div className="Projectsicon">
            <h1>Projects</h1>
            <div className="project-container">
              <a href="https://www.example.com/amadeus">
                <img className="project_icons" src={Amadeus_icon} alt="Amadeus Fan-Project Realisation 2.0" />
                <span>Amadeus Fan-Project Realisation 2.0 (name subject to change)</span>
              </a>
            </div>
            <div className="project-container">
              <a href="https://www.example.com/rakugaki">
                <img className="project_icons" src={Rakugaki_icon} alt="Rakugaki" />
                <span>Rakugaki</span>
              </a>
            </div>
          </div>

        </div>
        
      </div>
);
  
};

export default Introduction;
