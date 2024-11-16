import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

function navbar() {
  return (
    <Navbar expand="lg" className="navbar-custom">
      <Container>
        <Navbar.Brand href="#home">NARA</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="../components/addUser.js">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/AddUser">Add User</Nav.Link>
            <Nav.Link as={NavLink} to="/UserList">Manage Users</Nav.Link>
            <Nav.Link as={NavLink} to="/AddClub">Add Club</Nav.Link>
            <Nav.Link as={NavLink} to="/ClubsList">Manage Clubs</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default navbar;
