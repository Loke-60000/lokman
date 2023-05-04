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
                <Link className="nav-link" to="/"><span className="japanese-text">作品紹介</span> <br/> <span className="english-text">Introduction</span></Link>
              </Nav.Item>

              <Nav.Item>
                <Link className="nav-link" to="/lokman/blog"><span className="japanese-text">ブログ</span> <br/> <span className="english-text">Blog</span></Link>
              </Nav.Item>

              <Nav.Link href="/lokman/github"><span className="japanese-text">ギットハブ</span> <br/> <span className="english-text">Github</span></Nav.Link>
              <Nav.Link href="/lokman/projects"><span className="japanese-text">プロジェクト</span> <br/> <span className="english-text">Projects</span></Nav.Link>
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
