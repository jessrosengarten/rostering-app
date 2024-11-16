import React, { useState, useEffect } from 'react';
import { createClub, fetchManagers } from '../backend/ClubManagement';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import './style.css';

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
    
    const handleCreateClub = async (e) => {
        e.preventDefault();
        const {clubName,address, contact, openingTime, closingTime, manager, rate } = form;
        try {
            await createClub(clubName,address, contact, openingTime, closingTime, manager, rate);
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
        } catch (error) {
            setAlertMessage('Error adding club: ' + error.message);
            setAlertVariant('danger');
            setShowAlert(true);
        }
    };

    return (
        <Container style={{ marginTop: '50px' }}>
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <h1 className="mt-4">Add a Club</h1>
                    {showAlert && <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>{alertMessage}</Alert>}
                    <Form onSubmit={handleCreateClub} 
                        style={{ 
                            backgroundColor: '#4d4d4d', 
                            padding: '20px', 
                            borderRadius: '5px', 
                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', 
                            color: 'white' 
                        }}
                    >
                        <Form.Group controlId="formClubName">
                            <Form.Label>Club Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={form.clubName}
                                onChange={(e) => setForm({ ...form, clubName: e.target.value })}
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
                                value={form.address}
                                onChange={(e) => setForm({ ...form, address: e.target.value })}
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
                                value={form.contact}
                                onChange={(e) => setForm({ ...form, contact: e.target.value })}
                                required
                                style={{
                                    backgroundColor: '#e4e3e3',
                                    color: '#333',
                                    borderColor: '#e4e3e3',
                                  }}
                            />
                        </Form.Group>
                        <Form.Group controlId="formOpeningTime" className="mt-3">
                            <Form.Label>Opening Time</Form.Label>
                            <Form.Control
                                type="time"
                                value={form.openingTime}
                                onChange={(e) => setForm({ ...form, openingTime: e.target.value })}
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
                                value={form.closingTime}
                                onChange={(e) => setForm({ ...form, closingTime: e.target.value })}
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
                        value={form.manager}
                        onChange={(e) => setForm({ ...form, manager: e.target.value })}
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
                                value={form.rate}
                                onChange={(e) => setForm({ ...form, rate: e.target.value })}
                                required
                                style={{
                                    backgroundColor: '#e4e3e3',
                                    color: '#333',
                                    borderColor: '#e4e3e3',
                                  }}
                                />
                                </Form.Group>
                        <Button type="submit" variant="primary" className="mt-3"
                        style={{ backgroundColor: '#fc2929', borderColor: '#fc2929', color: 'white' }}>
                            Add Club
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AddClub;