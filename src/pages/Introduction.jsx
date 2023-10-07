import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CarouselComponent from '../components/Carousel';
import Amadeus_icon from '../assets/images/amadeus.webp';
import Rakugaki_icon from '../assets/images/rakugaki.webp';
import Atchan_icon from '../assets/images/atchan.webp';
import banner_one from '../assets/images/welcome_banner.webp';
import banner_two from '../assets/images/atchan_banner.webp';
import banner_three from '../assets/images/construction_banner.webp'
import { getDocs, collection, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase-config';
import { useLanguage } from '../components/LanguageToggle';
// import translations from '../translations.json';


const Introduction = () => {
  const [lastTenPosts, setLastTenPosts] = useState([]);
  const { language } = useLanguage();

  useEffect(() => {
    const fetchLastTenPosts = async () => {
      const postQuery = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(10));
      const postSnapshot = await getDocs(postQuery);
      const posts = postSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setLastTenPosts(posts);
    };

    fetchLastTenPosts();
  }, []);

  const carouselImages = [
    {
      src: banner_one,
      alt: 'Welcome',
      caption: '',
      link: 'https://lokman.fr/post/firstLink',  // Add link property
    },
    {
      src: banner_two,
      alt: 'atchan coming soon',
      caption: '',
      link: 'https://lokman.fr/post/secondLink', // Add link property
    },
    {
      src: banner_three,
      alt: 'Third slide',
      caption: '',
      link: 'https://lokman.fr/post/thirdLink',  // Add link property
    },
  ];
  

  const calculateAge = (birthdate) => {
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const age = calculateAge("2001-11-21");

  return (
      <div>
        <CarouselComponent images={carouselImages} />
        <hr />
        <div className="bio-container">
          <h2>About Me</h2>
          <p>
            Thank you for visiting my personal website! My name is Lokman RAMDANI, and I'm a {age} year-old web developer who's passionate about the digital world. After obtaining a literary baccalaureate and studying the Japanese language abroad, I made the decision to reorient my career and focus on the field of web development.
          </p>
          <h2>Education</h2>
          <ul>
            <li>2020: Literary baccalaureate - Montpellier, FRANCE</li>
            <li>2021: Japanese Language Course (6 months) - Tokyo Galaxy - Tokyo, JAPAN</li>
            <li>2022-2023: Web Developer and Web Mobile Course - ADRAR - Montpellier, FRANCE</li>
            </ul>
            <h2>Work Experience</h2>
            <ul>
            <li>2021: Freelance Illustrator - Providing illustration services via the Fiverr platform.</li>
            <li>2022-2023: development of several websites (react js, vue js) for restaurants among others</li>
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
              {lastTenPosts.map((post) => (
                <li key={post.id}>
                  <Link to={`/post/${post.id}`}>
                    {new Date(post.createdAt).toLocaleDateString()} - {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="Projectsicon">
            <h1>Projects</h1>
            <div className="project-container">
              <Link to="https://lokman.fr/post/ZbJ9NdhxWIlsgVlZ1GFc">
                <img className="project_icons" src={Amadeus_icon} alt="Amadeus Fan-Project Realisation 2.0" />
                <span>Fan-Project: Amadeus Reborn (name subject to change)</span>
              </Link>
            </div>
            <div className="project-container">
              <Link to="https://github.com/Loke-60000/Atto-channel">
                <img className="project_icons" src={Atchan_icon} alt="@Chan" />
                <span>@Chan (still in development)</span>
              </Link>
            </div>
            <div className="project-container">
              <Link to="/lokman/projects">
                <img className="project_icons" src={Rakugaki_icon} alt="Rakugaki" />
                <span>Rakugaki</span>
              </Link>
            </div>
          </div>
        </div>
        
      </div>
);
  
};

export default Introduction;
