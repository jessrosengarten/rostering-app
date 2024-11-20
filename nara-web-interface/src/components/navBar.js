import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

function NavBar({ isAuthenticated, userRole, onLogout }) {
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      onLogout();
    }
  };

  return (
    <Navbar expand="lg" className="navbar-custom">
      <Container>
        <span className="navbar-brand">NARA</span>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/Home">
              Home
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/AddUser"
              disabled={!isAuthenticated || userRole !== 'securityAdmin'}
            >
              Add User
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/UserList"
              disabled={!isAuthenticated || userRole !== 'securityAdmin'}
            >
              Manage Users
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/AddClub"
              disabled={!isAuthenticated || userRole !== 'securityAdmin'}
            >
              Add Club
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/ClubsList"
              disabled={!isAuthenticated || userRole !== 'securityAdmin'}
            >
              Manage Clubs
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {!isAuthenticated ? (
              <Nav.Link
                as={NavLink}
                to="/Login"
                style={{
                  marginLeft: '20px',
                  backgroundColor: '#fc2929',
                  color: '#ffffff',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  textAlign: 'center',
                }}
              >
                Login
              </Nav.Link>
            ) : (
              <Nav.Link
                onClick={handleLogout}
                style={{
                  marginLeft: '20px',
                  backgroundColor: '#fc2929',
                  color: '#ffffff',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
              >
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
