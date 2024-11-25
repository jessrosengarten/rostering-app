import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { createClub, fetchManagers } from '../backend/ClubManagement';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import './style.css';

// AddClub component
const AddClub = () => {
    const [form, setForm] = useState({
        clubName: '',
        address: '',
        contact: '',
        openingTime: '',
        closingTime: '',
        manager: '',
        rate: '',
    });

    const [managers, setManagers] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState('success');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const loadManagers = async () => {
            try {
                const managerList = await fetchManagers();
                setManagers(managerList);
            } catch (error) {
                console.error('Error fetching managers:', error);
            }
        };
        loadManagers();
    }, []);

    // Method to handle creating a club
    const handleCreateClub = async (e) => {
        e.preventDefault();
        const sanitizedForm = {
            clubName: sanitizeInput(form.clubName),
            address: sanitizeInput(form.address),
            contact: sanitizeInput(form.contact),
            openingTime: sanitizeInput(form.openingTime),
            closingTime: sanitizeInput(form.closingTime),
            manager: sanitizeInput(form.manager),
            rate: sanitizeInput(form.rate),
        };

        if (!validateContactNumber(sanitizedForm.contact)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                contact: 'Contact Number must be 10 digits.',
            }));
            return;
        }

        try {
            await createClub(
                sanitizedForm.clubName,
                sanitizedForm.address,
                sanitizedForm.contact,
                sanitizedForm.openingTime,
                sanitizedForm.closingTime,
                sanitizedForm.manager,
                sanitizedForm.rate
            );
            setAlertMessage('Club added successfully');
            setAlertVariant('success');
            setShowAlert(true);

            setForm({
                clubName: '',
                address: '',
                contact: '',
                openingTime: '',
                closingTime: '',
                manager: '',
                rate: '',
            });
            setErrors({});
        } catch (error) {
            setAlertMessage('Error adding club: ' + error.message);
            setAlertVariant('danger');
            setShowAlert(true);
        }
    };

    // Method to sanitize input
    const sanitizeInput = (value) => {
        return DOMPurify.sanitize(value);
    };

    //Method to validate contact number
    const validateContactNumber = (contact) => {
        const contactNumberRegex = /^\d{10}$/;
        return contactNumberRegex.test(contact);
    };

    //Method to handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const sanitizedValue = sanitizeInput(value);
        setForm({ ...form, [name]: sanitizedValue });

        // Clear errors for the field if present
        if (errors[name]) {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
        }

        // Validate contact number in real-time
        if (name === 'contact') {
            if (!validateContactNumber(sanitizedValue)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    contact: 'Contact Number must be exactly 10 digits.',
                }));
            } else {
                setErrors((prevErrors) => ({ ...prevErrors, contact: '' }));
            }
        }
    };

    return (
        <Container style={{ marginTop: '50px' }}>
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <h1 className="mt-4">Add a Club</h1>
                    {showAlert && <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>{alertMessage}</Alert>}
                    <Form
                        onSubmit={handleCreateClub}
                        style={{
                            backgroundColor: '#4d4d4d',
                            padding: '20px',
                            borderRadius: '5px',
                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                            color: 'white',
                        }}
                    >
                        <Form.Group controlId="formClubName">
                            <Form.Label>Club Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="clubName"
                                value={form.clubName}
                                onChange={handleInputChange}
                                required
                                style={{
                                    backgroundColor: '#e4e3e3',
                                    color: '#333',
                                    borderColor: '#e4e3e3',
                                }}
                            />
                        </Form.Group>
                        <Form.Group controlId="formAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                value={form.address}
                                onChange={handleInputChange}
                                required
                                style={{
                                    backgroundColor: '#e4e3e3',
                                    color: '#333',
                                    borderColor: '#e4e3e3',
                                }}
                            />
                        </Form.Group>
                        <Form.Group controlId="formContact" className="mt-3">
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control
                                type="tel"
                                name="contact"
                                value={form.contact}
                                onChange={handleInputChange}
                                required
                                isInvalid={!!errors.contact}
                                style={{
                                    backgroundColor: '#e4e3e3',
                                    color: '#333',
                                    borderColor: '#e4e3e3',
                                }}
                            />
                            {errors.contact && <small className="text-danger">{errors.contact}</small>}
                        </Form.Group>
                        <Form.Group controlId="formOpeningTime" className="mt-3">
                            <Form.Label>Opening Time</Form.Label>
                            <Form.Control
                                type="time"
                                name="openingTime"
                                value={form.openingTime}
                                onChange={handleInputChange}
                                required
                                style={{
                                    backgroundColor: '#e4e3e3',
                                    color: '#333',
                                    borderColor: '#e4e3e3',
                                }}
                            />
                        </Form.Group>
                        <Form.Group controlId="formClosingTime" className="mt-3">
                            <Form.Label>Closing Time</Form.Label>
                            <Form.Control
                                type="time"
                                name="closingTime"
                                value={form.closingTime}
                                onChange={handleInputChange}
                                required
                                style={{
                                    backgroundColor: '#e4e3e3',
                                    color: '#333',
                                    borderColor: '#e4e3e3',
                                }}
                            />
                        </Form.Group>
                        <Form.Group controlId="formManager" className="mt-3">
                            <Form.Label>Manager</Form.Label>
                            <Form.Control
                                as="select"
                                name="manager"
                                value={form.manager}
                                onChange={handleInputChange}
                                required
                                style={{
                                    backgroundColor: '#e4e3e3',
                                    color: '#333',
                                    borderColor: '#e4e3e3',
                                }}
                            >
                                <option value="">Select a Manager</option>
                                {managers.map((manager, index) => (
                                    <option key={index} value={manager}>
                                        {manager}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formRate" className="mt-3">
                            <Form.Label>Rate Per Security Personnel (Rands)</Form.Label>
                            <Form.Control
                                type="number"
                                name="rate"
                                value={form.rate}
                                onChange={handleInputChange}
                                required
                                style={{
                                    backgroundColor: '#e4e3e3',
                                    color: '#333',
                                    borderColor: '#e4e3e3',
                                }}
                            />
                        </Form.Group>
                        <Button
                            type="submit"
                            variant="primary"
                            className="mt-3"
                            style={{ backgroundColor: '#fc2929', borderColor: '#fc2929', color: 'white' }}
                        >
                            Add Club
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AddClub;
