import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { login } from '../backend/loginAndRegister';
import { db } from '../backend/firebaseConfig';
import { ref, get } from 'firebase/database';

function Login({ onLoginSuccess }) {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(''); // 'success' or 'danger'
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { email, password } = form;

    try {
      const user = await login(email, password);

      const userRef = ref(db, `securityAdmin/${email.replace('.', ',')}`);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const userData = snapshot.val();
        setMessageType('success');
        setMessage('Successfully logged in.');
        onLoginSuccess('securityAdmin'); // Pass role to App
        navigate('/Home');
      } else {
        setMessageType('danger');
        setMessage('Access denied. Only Security Admins are allowed.');
      }
    } catch (error) {
      setMessageType('danger');
      setMessage('Login failed. Please check your credentials.');
    }
  };

  const submit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    handleLogin().finally(() => setIsSubmitting(false));
  };

  return (
    <Container
      style={{
        backgroundColor: '#4d4d4d',
        color: '#ffffff',
        padding: '30px',
        borderRadius: '10px',
        marginTop: '50px',
        maxWidth: '400px',
      }}
    >
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h1>
      {message && <Alert variant={messageType}>{message}</Alert>}
      <Form onSubmit={submit}>
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            style={{
              backgroundColor: '#e4e3e3',
              borderColor: '#ccc',
              color: '#333',
            }}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
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
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </Form.Group>

        <Button
          type="submit"
          style={{
            width: '100%',
            backgroundColor: '#fc2929',
            borderColor: '#fc2929',
            color: '#ffffff',
          }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
