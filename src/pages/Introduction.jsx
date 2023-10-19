import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CarouselComponent from '../components/Carousel';
import Amadeus_icon from '../assets/images/amadeus.webp';
import Rakugaki_icon from '../assets/images/rakugaki.webp';
import Atchan_icon from '../assets/images/atchan.webp';
import banner_one from '../assets/images/WEBSITE_Gadgetlab_website.webp';
import banner_two from '../assets/images/WEBSITE_bannerr_contactme_1.webp';
import banner_three from '../assets/images/WEBSITE_bannerr_amadeus_1.webp'
import banner_four from '../assets/images/atchan_banner.webp'
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
      alt: 'Get a website!',
      caption: '',
      link: 'https://www.fiverr.com/s/w5EEmr',  
    },
    {
      src: banner_two,
      alt: 'Contact me for more informations!',
      caption: '',
      link: 'https://lokman.fr/#/contact', 
    },
    {
      src: banner_three,
      alt: 'Amadeus Project',
      caption: '',
      link: 'https://lokman.fr/#/post/sBpyBH39fyK2qWyi0rfu', 
    },
    {
      src: banner_four,
      alt: 'Atto Channel soon available',
      caption: '',
      link: 'https://github.com/Loke-60000/Atto-channel',
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

  const isNewPost = (postDate) => {
    const currentDate = new Date();
    const postCreationDate = new Date(postDate);
    const oneMonthInMilliseconds = 30 * 24 * 60 * 60 * 1000;

    return currentDate - postCreationDate < oneMonthInMilliseconds;
};


  return (
      <div>
        <CarouselComponent images={carouselImages} />
        <hr />
        <div className="bio-container">
          <h2><span className="ColoredLetter">A</span>bout Me</h2>
          <p>
            Thank you for visiting my personal website! My name is Lokman, and I'm a {age} year-old web developer who's passionate about the digital world. After obtaining a literary baccalaureate and studying the Japanese language abroad, I made the decision to reorient my career and focus on the field of web development.
          </p>
          <h2><span className="ColoredLetter">E</span>ducation</h2>
          <ul>
            <li>2020: Literary baccalaureate - Montpellier, FRANCE</li>
            <li>2021: Japanese Language Course (6 months) - Tokyo Galaxy - Tokyo, JAPAN</li>
            <li>2022-2023: Web Developer and Web Mobile Course - ADRAR - Montpellier, FRANCE</li>
            </ul>
            <h2><span className="ColoredLetter">W</span>ork Experience</h2>
            <ul>
            <li>2021: Freelance Illustrator - Providing illustration services via the Fiverr platform.</li>
            <li>2022-2023: development of several websites (react js, vue js) for restaurants among others</li>
            </ul>
            <h2><span className="ColoredLetter">I</span>nterests</h2>
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
            <h1><span className='ColoredLetter'>N</span>ews</h1>
            <ul className='Post'>
              {lastTenPosts.map((post) => (
                <li className='PostList' key={post.id}>
                  <span className='postDate'>{new Date(post.createdAt).toLocaleDateString()}</span>
                  <Link to={`/post/${post.id}`} className='postName'>{post.title}</Link>
                  {isNewPost(post.createdAt) && <span style={{color: '#d26600'}}> [New!]</span>}
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
