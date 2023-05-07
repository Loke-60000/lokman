import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const MainNavbar = () => {
    return (
        <Navbar expand="lg" className="bg-transparent">
          <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ color: 'white' }} />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto nav-centered">
              <Nav.Item>
                <Link className="nav-link" to="/lokman/introduction"><span className="japanese-text">作品紹介</span> <br/> <span className="english-text">Introduction</span></Link>
              </Nav.Item>

              <Nav.Item>
                <Link className="nav-link" to="/lokman/blog"><span className="japanese-text">ニュース</span> <br/> <span className="english-text">News</span></Link>
              </Nav.Item>

              <Nav.Link href="https://github.com/Loke-60000" target="_blank" rel="noopener noreferrer"><span className="japanese-text">ギットハブ</span> <br/> <span className="english-text">Github</span></Nav.Link>
              <Link className="nav-link" to="/lokman/projects"><span className="japanese-text">プロジェクト</span> <br/> <span className="english-text">Projects</span></Link>
              <Nav.Item>
                <Link className="nav-link" to="/lokman/links"><span className="japanese-text">リンクス</span> <br/> <span className="english-text">Links</span></Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="nav-link" to="/lokman/contact"><span className="japanese-text">コンタクト</span> <br/> <span className="english-text">Contact</span></Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    );
};

export default MainNavbar;
