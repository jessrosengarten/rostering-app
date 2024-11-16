import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert, InputGroup } from 'react-bootstrap';
import './style.css';
import { addUser } from '../backend/UserManagement';

const AddUser = () => {
    const [form, setForm] = useState({
        email: '',
        role: '',
        password: '',
        fullName: '',
        rate: '',
        contactNumber: '',
        bankDetails: '',
        gender: '',
        personnelType: '',
    });

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState('success');
    const [errors, setErrors] = useState({});

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
        if (errors.password) {
            setErrors({ ...errors, password: '' });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'role') {
            setForm({
                email: '',
                role: value,
                password: '',
                fullName: '',
                rate: '',
                contactNumber: '',
                bankDetails: '',
                gender: '',
                personnelType: '',
            });
            setErrors({});
        } else {
            setForm({ ...form, [name]: value });
            if (errors[name]) {
                setErrors({ ...errors, [name]: '' });
            }
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!form.role) newErrors.role = 'Role is required';
        if (!form.fullName) newErrors.fullName = 'Full Name is required';
        if (!form.contactNumber) newErrors.contactNumber = 'Contact Number is required';
        if (!form.email) newErrors.email = 'Email is required';
        if (!form.password) newErrors.password = 'Password is required';

        if (form.role === 'securityPersonnel') {
            if (!form.rate) newErrors.rate = 'Rate is required';
            if (!form.bankDetails) newErrors.bankDetails = 'Bank Details are required';
            if (!form.gender) newErrors.gender = 'Gender is required';
            if (!form.personnelType) newErrors.personnelType = 'Personnel Type is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const { email, role, password, fullName, rate, contactNumber, bankDetails, gender, personnelType } = form;
        try {
            await addUser({ email, role, password, fullName, rate, contactNumber, bankDetails, gender, personnelType });
            setAlertMessage('User added successfully');
            setAlertVariant('success');
            setShowAlert(true);

            // Clear the form fields
            setForm({
                email: '',
                role: '',
                password: '',
                fullName: '',
                rate: '',
                contactNumber: '',
                bankDetails: '',
                gender: '',
                personnelType: '',
            });
        } catch (error) {
            setAlertMessage('Error adding user: ' + error.message);
            setAlertVariant('danger');
            setShowAlert(true);
        }

        setTimeout(() => {
            setAlertMessage('');
            setShowAlert(false);
        }, 5000);
    };

    React.useEffect(() => {
        document.body.style.backgroundColor = '#bfbfbf';
      }, []);

    return (
        <Container style={{ marginTop: '50px', marginBottom: '50px' }}>
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <h1 className="mt-4">Add a User</h1>
                    {showAlert && <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>{alertMessage}</Alert>}
                    <Form onSubmit={handleSubmit} 
                        style={{ 
                            backgroundColor: '#4d4d4d', 
                            padding: '20px', 
                            borderRadius: '5px', 
                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', 
                            color: 'white' 
                        }}
                    >
                        <Form.Group controlId="formRole" className="mt-3">
                            <Form.Label>User Type</Form.Label>
                            <Form.Control
                                as="select"
                                name="role"
                                value={form.role}
                                onChange={handleChange}
                                isInvalid={!!errors.role}
                                style={{
                                    backgroundColor: '#e4e3e3',
                                    color: '#333',
                                    borderColor: '#e4e3e3',
                                  }}
                            >
                                <option value="">Select User Type</option>
                                <option value="clubManager">Club Manager</option>
                                <option value="securityAdmin">Security Admin</option>
                                <option value="securityPersonnel">Security Personnel</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">{errors.role}</Form.Control.Feedback>
                        </Form.Group>
                        {form.role && (
                            <>
                                <Form.Group controlId="formFullName" className="mt-3">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="fullName"
                                        value={form.fullName}
                                        onChange={handleChange}
                                        isInvalid={!!errors.fullName}
                                        style={{
                                            backgroundColor: '#e4e3e3',
                                            color: '#333',
                                            borderColor: '#e4e3e3',
                                          }}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="formContactNumber" className="mt-3">
                                    <Form.Label>Contact Number</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="contactNumber"
                                        value={form.contactNumber}
                                        onChange={handleChange}
                                        isInvalid={!!errors.contactNumber}
                                        style={{
                                            backgroundColor: '#e4e3e3',
                                            color: '#333',
                                            borderColor: '#e4e3e3',
                                          }}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.contactNumber}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="formEmail" className="mt-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        isInvalid={!!errors.email}
                                        style={{
                                            backgroundColor: '#e4e3e3',
                                            color: '#333',
                                            borderColor: '#e4e3e3',
                                          }}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="formPassword" className="mt-3">
                                    <Form.Label>Password</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            value={form.password}
                                            onChange={handleChange}
                                            isInvalid={!!errors.password}
                                            style={{
                                                backgroundColor: '#e4e3e3',
                                                color: '#333',
                                                borderColor: '#e4e3e3',
                                              }}
                                        />
                                        <Button variant="secondary" onClick={handleGeneratePassword} className='generate-password-button'
                                        style={{ backgroundColor: '#272727', borderColor: '#272727', color: 'white' }}>
                                            Generate Password
                                        </Button>
                                        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                                {form.role === 'securityPersonnel' && (
                                    <>
                                        <Form.Group controlId="formRate" className="mt-3">
                                            <Form.Label>Rate</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="rate"
                                                value={form.rate}
                                                onChange={handleChange}
                                                isInvalid={!!errors.rate}
                                                style={{
                                                    backgroundColor: '#e4e3e3',
                                                    color: '#333',
                                                    borderColor: '#e4e3e3',
                                                  }}
                                            />
                                            <Form.Control.Feedback type="invalid">{errors.rate}</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group controlId="formBankDetails" className="mt-3">
                                            <Form.Label>Bank Details</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="bankDetails"
                                                value={form.bankDetails}
                                                onChange={handleChange}
                                                isInvalid={!!errors.bankDetails}
                                                style={{
                                                    backgroundColor: '#e4e3e3',
                                                    color: '#333',
                                                    borderColor: '#e4e3e3',
                                                  }}
                                            />
                                            <Form.Control.Feedback type="invalid">{errors.bankDetails}</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group controlId="formGender" className="mt-3">
                                            <Form.Label>Gender</Form.Label>
                                            <Form.Control
                                                as="select"
                                                name="gender"
                                                value={form.gender}
                                                onChange={handleChange}
                                                isInvalid={!!errors.gender}
                                                style={{
                                                    backgroundColor: '#e4e3e3',
                                                    color: 'black',
                                                    borderColor: '#e4e3e3',
                                                  }}
                                            >
                                                <option value="">Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </Form.Control>
                                            <Form.Control.Feedback type="invalid">{errors.gender}</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group controlId="formPersonnelType" className="mt-3">
                                            <Form.Label>Personnel Type</Form.Label>
                                            <Form.Control
                                                as="select"
                                                name="personnelType"
                                                value={form.personnelType}
                                                onChange={handleChange}
                                                isInvalid={!!errors.personnelType}
                                                style={{
                                                    backgroundColor: '#e4e3e3',
                                                    color: '#333',
                                                    borderColor: '#e4e3e3',
                                                  }}
                                            >
                                                <option value="">Select Personnel Type</option>
                                                <option value="headSecurity">Head Security</option>
                                                <option value="standardSecurity">Standard Security</option>
                                            </Form.Control>
                                            <Form.Control.Feedback type="invalid">{errors.personnelType}</Form.Control.Feedback>
                                        </Form.Group>
                                    </>
                                )}
                                <Button type="submit" variant="#ff4a4a" className="mt-3"
                                style={{ backgroundColor: '#fc2929', borderColor: '#fc2929', color: 'white' }}>
                                    Add User
                                </Button>
                            </>
                        )}
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AddUser;