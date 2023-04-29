import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const MainNavbar = () => {
    return (
        <Navbar expand="lg" className="bg-transparent">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto nav-centered">
              <Nav.Link href="">作品紹介 <br/> Introduction</Nav.Link>
              <Nav.Link href="">ブログ <br/> Blog</Nav.Link>
              <Nav.Link href="">ギットハブ <br/> Github</Nav.Link>
              <Nav.Link href="">プロジェクト <br/> Projects</Nav.Link>
              <Nav.Link href="">リンク <br/> Links</Nav.Link>
              <Nav.Link href="">コンタクト <br/> Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
};

export default MainNavbar;
