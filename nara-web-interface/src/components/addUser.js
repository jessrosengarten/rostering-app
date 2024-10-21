import React, { useState } from 'react';
import { db } from '../backend/firebaseConfig';
import { ref, set } from 'firebase/database';
import { register } from '../backend/loginAndRegister';
import { Form, Button, Container, Row, Col, Alert, InputGroup } from 'react-bootstrap';
import './style.css';

const AddUser = () => {
    const [form, setForm] = useState({
        email: '',
        role: '',
        password: '',
    });

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState('success');

    const generatePassword = (length = 12) => {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
        let password = "";
        for (let i = 0, n = charset.length; i < length; ++i) {
            password += charset.charAt(Math.floor(Math.random() * n));
        }
        return password;
    };

    const handleGeneratePassword = () => {
        const newPassword = generatePassword();
        setForm({ ...form, password: newPassword });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, role, password } = form;
        try {
            await register(email, password);
            const userRef = ref(db, 'users/' + email.replace('.', ','));
            await set(userRef, { email, role });
            setAlertMessage('User added successfully');
            setAlertVariant('success');
            setShowAlert(true);
            // Clear the form fields
            setForm({
                email: '',
                role: '',
                password: '',
            });
        } catch (error) {
            setAlertMessage('Error adding user: ' + error.message);
            setAlertVariant('danger');
            setShowAlert(true);
        }
    };

    return (
        <Container style={{ marginTop: '50px' }}>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h1 className="mt-4">Add a User</h1>
                    {showAlert && <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>{alertMessage}</Alert>}
                    <Form onSubmit={handleSubmit} style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formRole" className="mt-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Control
                                as="select"
                                value={form.role}
                                onChange={(e) => setForm({ ...form, role: e.target.value })}
                                required
                            >
                                <option value="">Select Role</option>
                                <option value="clubManager">Club Manager</option>
                                <option value="securityAdmin">Security Admin</option>
                                <option value="securityPersonnel">Security Personnel</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formPassword" className="mt-3">
                            <Form.Label>Password</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    required
                                />
                                <Button variant="secondary" onClick={handleGeneratePassword} className='generate-password-button'>
                                    Generate Password
                                </Button>
                            </InputGroup>
                        </Form.Group>
                        <Button type="submit" variant="primary" className="mt-3">
                            Add User
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AddUser;