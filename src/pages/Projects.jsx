import React from 'react';
import { Link } from 'react-router-dom';
import Amadeus_icon from '../assets/images/amadeus.webp';
import Rakugaki_icon from '../assets/images/rakugaki.webp';
import Atchan_icon from '../assets/images/atchan.webp';
import Jinjoo_icon from '../assets/images/JINJOO.jpg';

const Projects = () => {
  return (
    <div className="post_list">
          <div className="container">
            <h1 className='projectsTitle'><span className='ColoredLetter'>P</span>rojects</h1>
            <hr />
            <div className="ProjectIconsOnProjectsPage">
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
            <div className="project-container">
              <Link to="https://jin-joo.fr">
                <img className="project_icons" src={Jinjoo_icon} alt="Rakugaki" />
                <span>Jin-Joo.fr</span>
              </Link>
            </div>
          </div>
          </div>
    </div>
  );
};

export default Projects;
