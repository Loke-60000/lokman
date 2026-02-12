"use client";

import React from "react";
import Link from "next/link";
import { Navbar, Nav } from "react-bootstrap";

const DebugNavbar = () => {
  return (
    <Navbar expand="lg" className="bg-transparent">
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        style={{ color: "white" }}
      />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto nav-centered">
          <Nav.Item>
            <Link className="nav-link" href="/createpost">
              <span className="japanese-text">ブログ</span> <br />
              <span className="english-text">Blog</span>
            </Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default DebugNavbar;
