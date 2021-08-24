import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';

const Header = () => (
  <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand><Link className="link" to="/">Movies DB</Link></Navbar.Brand>
    </Container>
  </Navbar>
)

export default Header;