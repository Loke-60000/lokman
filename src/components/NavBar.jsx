import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const MainNavbar = () => {
  const [isNavbarExpanded, setNavbarExpanded] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  // Close the navbar whenever the location (route) changes
  React.useEffect(() => {
    setNavbarExpanded(false); // Close the navbar
  }, [location]);

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleCloseDropdown = () => {
    setDropdownOpen(false);
  };

  const toggleNavbar = () => {
    setNavbarExpanded(!isNavbarExpanded);
  };

  return (
    <Navbar
      expand="lg"
      className="bg-transparent"
      expanded={isNavbarExpanded} // Controlled navbar state
    >
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        style={{ color: 'white' }}
        onClick={toggleNavbar} // Toggle the navbar on mobile
      />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="nav-centered">
          <Nav.Item>
            <Link className="nav-link" to="/introduction">
              <span className="japanese-text">作品紹介</span> <br />
              <span className="english-text">Introduction</span>
            </Link>
          </Nav.Item>

          <Nav.Item>
            <Link className="nav-link" to="/blog">
              <span className="japanese-text">ニュース</span> <br />
              <span className="english-text">News</span>
            </Link>
          </Nav.Item>

          <Nav.Link href="https://github.com/Loke-60000" target="_blank" rel="noopener noreferrer">
            <span className="japanese-text">ギットハブ</span> <br />
            <span className="english-text">Github</span>
          </Nav.Link>
{/* 
          <Nav.Link className='nav-link' to="/resume">
            <span className="japanese-text">履歴書</span> <br />
            <span className="english-text">Resume<br/>(coming soon...)</span>
          </Nav.Link> 
*/}

          <Link className="nav-link" to="/projects">
            <span className="japanese-text">プロジェクト</span> <br />
            <span className="english-text">Projects</span>
          </Link>

          {/* Portfolio Dropdown - Handle hover for desktop and click/touch for mobile */}
          <Nav.Item className="portfolio-hover" onMouseLeave={handleCloseDropdown}>
            <span className="nav-link" onClick={handleDropdownToggle}>
              <span className="japanese-text">ポートフォリオ</span> <br />
              <span className="english-text">Portfolio dev</span>
            </span>

            <div className={`portfolio-dropdown ${isDropdownOpen ? 'show' : ''}`}>
              <Nav.Link className="dropdown-item" href="https://github.com/Loke-60000/snake" onClick={handleCloseDropdown}>Snake game</Nav.Link>
              <hr />
              <Nav.Link className="dropdown-item" href="https://github.com/Loke-60000/moviewise" onClick={handleCloseDropdown}>Movie recommendation <br></br> system</Nav.Link>
              <hr />
              <Nav.Link className="dropdown-item" href="https://github.com/Loke-60000/weather-report-assistant" onClick={handleCloseDropdown}>Weather report chatbot</Nav.Link>
              <hr />
              <Nav.Link className="dropdown-item" href="https://github.com/Loke-60000/AJAX-clustering" onClick={handleCloseDropdown}>AJAX clustering</Nav.Link>
              <hr />
              <Nav.Link className="dropdown-item" href="https://github.com/Loke-60000/book_web_scrapping_and_dashboard" onClick={handleCloseDropdown}>Book web scrapping and <br></br>dashboard</Nav.Link>
              <hr />
              <Nav.Link className="dropdown-item" href="https://github.com/Loke-60000/NeuroApp" onClick={handleCloseDropdown}>NeuroApp<br/>"Brain tumor detection"</Nav.Link>
              <hr />
              <Nav.Link className="dropdown-item" href="https://github.com/Loke-60000/Digits-letters-clothes-Classifier" onClick={handleCloseDropdown}>Digits, letters,,<br />clothes Classifier</Nav.Link>
              <hr />
              <Nav.Link className="dropdown-item" href="https://github.com/Loke-60000/Simplon-Real-Estate-Transactions-API" onClick={handleCloseDropdown}>API: Real Estate Transactions</Nav.Link> 
              <hr />
              <Nav.Link className="dropdown-item" href="https://github.com/Loke-60000/SquareMeterPricingPredictorAPI" onClick={handleCloseDropdown}>API: Square Meter Pricing <br/>Predictor</Nav.Link> 
              <hr />
              <Nav.Link className="dropdown-item" href="https://github.com/Loke-60000/Archaeological-Sites-Sorter" onClick={handleCloseDropdown}>Archaeological Sites Sorter</Nav.Link>
            </div>
          </Nav.Item>

          <Nav.Item>
                <Link className="nav-link" to="/illustrations"><span className="japanese-text">イラスト</span> <br/> <span className="english-text">Illustrations</span></Link>
          </Nav.Item>

          <Nav.Item>
            <Link className="nav-link" to="/contact">
              <span className="japanese-text">コンタクト</span> <br />
              <span className="english-text">Contact</span>
            </Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MainNavbar;
