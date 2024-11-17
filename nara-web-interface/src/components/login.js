import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';

function Login() {
  return (
    <Container
      style={{
        backgroundColor: '#4d4d4d', // Dark grey background
        color: '#ffffff',
        padding: '30px',
        borderRadius: '10px',
        marginTop: '50px',
        maxWidth: '400px',
      }}
    >
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h1>
      <Form>
        <Form.Group controlId="formUsername" className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            style={{
              backgroundColor: '#e4e3e3',
              borderColor: '#ccc',
              color: '#333',
            }}
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            style={{
              backgroundColor: '#e4e3e3',
              borderColor: '#ccc',
              color: '#333',
            }}
          />
        </Form.Group>

        <Button
          type="submit"
          style={{
            width: '100%',
            backgroundColor: '#fc2929', // Bright red for button
            borderColor: '#fc2929',
            color: '#ffffff',
          }}
        >
          Login
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
