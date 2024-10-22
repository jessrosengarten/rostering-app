import React, { useState } from 'react';
import { db } from '../backend/firebaseConfig';
import { ref, set } from 'firebase/database';
import { createClub } from '../backend/ClubManagement';
import { Form, Button, Container, Row, Col, Alert, InputGroup } from 'react-bootstrap';
import './style.css';

const AddClub = () => {
    const [form, setForm] = useState({
        clubName: '',
        contact: '',
        openingTime: '',
        closingTime: '',
        manager: '',
    });

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState('success');

    
    const handleCreateClub = async (e) => {
        e.preventDefault();
        const {clubName, contact, openingTime, closingTime, manager } = form;
        try {
            await createClub(clubName, contact, openingTime, closingTime, manager);
            setAlertMessage('Club added successfully');
            setAlertVariant('success');
            setShowAlert(true);

            setForm({
              clubName: '',
              contact: '',
              openingTime: '',
              closingTime: '',
              manager: '',
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
                <Col md={6}>
                    <h1 className="mt-4">Add a Club</h1>
                    {showAlert && <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>{alertMessage}</Alert>}
                    <Form onSubmit={handleCreateClub} style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                        <Form.Group controlId="formClubName">
                            <Form.Label>Club Name</Form.Label>
                            <Form.Control
                                type="clubName"
                                value={form.clubName}
                                onChange={(e) => setForm({ ...form, clubName: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formContact" className="mt-3">
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control
                                type="contactNumber"
                                value={form.contact}
                                onChange={(e) => setForm({ ...form, contact: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formOpeningTime" className="mt-3">
                            <Form.Label>Opening Time</Form.Label>
                            <Form.Control
                                type="openingTime"
                                value={form.openingTime}
                                onChange={(e) => setForm({ ...form, openingTime: e.target.value })}
                                required
                                />
                        </Form.Group>
                        <Form.Group controlId="formClosingTime" className="mt-3">
                            <Form.Label>Closing Time</Form.Label>
                            <Form.Control
                                type="closingTime"
                                value={form.closingTime}
                                onChange={(e) => setForm({ ...form, closingTime: e.target.value })}
                                required
                                />
                        </Form.Group>
                        <Form.Group controlId="formManager" className="mt-3">
                            <Form.Label>Manager</Form.Label>
                            <Form.Control
                                type="manager"
                                value={form.manager}
                                onChange={(e) => setForm({ ...form, manager: e.target.value })}
                                required
                                />
                        </Form.Group>
                        <Button type="submit" variant="primary" className="mt-3">
                            Add Club
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AddClub;