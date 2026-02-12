"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Navbar, Nav } from "react-bootstrap";

const MainNavbar = () => {
  const [isNavbarExpanded, setNavbarExpanded] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  // Close the navbar whenever the route changes
  useEffect(() => {
    setNavbarExpanded(false);
  }, [pathname]);

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
    <Navbar expand="lg" className="bg-transparent" expanded={isNavbarExpanded}>
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        style={{ color: "white" }}
        onClick={toggleNavbar}
      />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="nav-centered">
          <Nav.Item>
            <Link className="nav-link" href="/introduction">
              <span className="japanese-text">作品紹介</span> <br />
              <span className="english-text">Introduction</span>
            </Link>
          </Nav.Item>

          {/* News — hidden
          <Nav.Item>
            <Link className="nav-link" href="/blog">
              <span className="japanese-text">ニュース</span> <br />
              <span className="english-text">News</span>
            </Link>
          </Nav.Item>
          */}

          <Nav.Link
            href="https://github.com/Loke-60000"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="japanese-text">ギットハブ</span> <br />
            <span className="english-text">Github</span>
          </Nav.Link>

          {/* Projects — hidden
          <Nav.Item>
            <Link className="nav-link" href="/projects">
              <span className="japanese-text">プロジェクト</span> <br />
              <span className="english-text">Projects</span>
            </Link>
          </Nav.Item>
          */}

          {/* Portfolio Dropdown — hidden
          <Nav.Item
            className="portfolio-hover"
            onMouseLeave={handleCloseDropdown}
          >
            <span className="nav-link" onClick={handleDropdownToggle}>
              <span className="japanese-text">ポートフォリオ</span> <br />
              <span className="english-text">Portfolio dev</span>
            </span>

            <div
              className={`portfolio-dropdown ${isDropdownOpen ? "show" : ""}`}
            >
              <Nav.Link
                className="dropdown-item"
                href="https://github.com/Loke-60000/snake"
                onClick={handleCloseDropdown}
              >
                Snake game
              </Nav.Link>
              <hr />
              <Nav.Link
                className="dropdown-item"
                href="https://github.com/Loke-60000/moviewise"
                onClick={handleCloseDropdown}
              >
                Movie recommendation <br /> system
              </Nav.Link>
              <hr />
              <Nav.Link
                className="dropdown-item"
                href="https://github.com/Loke-60000/weather-report-assistant"
                onClick={handleCloseDropdown}
              >
                Weather report chatbot
              </Nav.Link>
              <hr />
              <Nav.Link
                className="dropdown-item"
                href="https://github.com/Loke-60000/AJAX-clustering"
                onClick={handleCloseDropdown}
              >
                AJAX clustering
              </Nav.Link>
              <hr />
              <Nav.Link
                className="dropdown-item"
                href="https://github.com/Loke-60000/book_web_scrapping_and_dashboard"
                onClick={handleCloseDropdown}
              >
                Book web scrapping and <br />
                dashboard
              </Nav.Link>
              <hr />
              <Nav.Link
                className="dropdown-item"
                href="https://github.com/Loke-60000/NeuroApp"
                onClick={handleCloseDropdown}
              >
                NeuroApp
                <br />
                &quot;Brain tumor detection&quot;
              </Nav.Link>
              <hr />
              <Nav.Link
                className="dropdown-item"
                href="https://github.com/Loke-60000/Digits-letters-clothes-Classifier"
                onClick={handleCloseDropdown}
              >
                Digits, letters,
                <br />
                clothes Classifier
              </Nav.Link>
              <hr />
              <Nav.Link
                className="dropdown-item"
                href="https://github.com/Loke-60000/Simplon-Real-Estate-Transactions-API"
                onClick={handleCloseDropdown}
              >
                API: Real Estate Transactions
              </Nav.Link>
              <hr />
              <Nav.Link
                className="dropdown-item"
                href="https://github.com/Loke-60000/SquareMeterPricingPredictorAPI"
                onClick={handleCloseDropdown}
              >
                API: Square Meter Pricing <br />
                Predictor
              </Nav.Link>
              <hr />
              <Nav.Link
                className="dropdown-item"
                href="https://github.com/Loke-60000/Archaeological-Sites-Sorter"
                onClick={handleCloseDropdown}
              >
                Archaeological Sites Sorter
              </Nav.Link>
            </div>
          </Nav.Item>
          */}

          <Nav.Item>
            <Link className="nav-link" href="/illustrations">
              <span className="japanese-text">イラスト</span> <br />{" "}
              <span className="english-text">Illustrations</span>
            </Link>
          </Nav.Item>

          <Nav.Item>
            <Link className="nav-link" href="/contact">
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
