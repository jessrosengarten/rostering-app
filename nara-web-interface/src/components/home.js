import React from 'react'
import { Container } from 'react-bootstrap'
import naraLogoCentered from '../components/naraLogoCentered.jpg'

function HomePage() {

  return (
    <Container
      style={{
        color: 'black',
        height: '75vh', // Full viewport height
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      {/* Use Nara logo */}
      <img
        src={naraLogoCentered}
        alt="Nara Logo"
        style={{
          width: '200px',
          marginBottom: '20px',
        }}
      />
      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>
        Welcome to Nara
      </h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '30px', color: 'black' }}>
        Your ultimate platform for managing Security Personnel and Clubs.
      </p>
    </Container>
  );
}

export default HomePage;
