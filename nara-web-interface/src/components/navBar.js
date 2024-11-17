import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

function navbar() {
  return (
    <Navbar expand="lg" className="navbar-custom">
      <Container>
        <Navbar.Brand href="/Home">NARA</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/Home">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/AddUser">Add User</Nav.Link>
            <Nav.Link as={NavLink} to="/UserList">Manage Users</Nav.Link>
            <Nav.Link as={NavLink} to="/AddClub">Add Club</Nav.Link>
            <Nav.Link as={NavLink} to="/ClubsList">Manage Clubs</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link
              as={NavLink}
              to="/Login"
              style={{
                marginLeft: '20px', // Adds space between Manage Clubs and Login
                backgroundColor: '#fc2929', // Bright red theme color
                color: '#ffffff', // White text
                padding: '10px 20px',
                borderRadius: '5px',
                textAlign: 'center',
              }}
            >
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default navbar;
