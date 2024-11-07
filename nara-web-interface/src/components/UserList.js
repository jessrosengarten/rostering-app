import React, { useState, useEffect } from 'react';
import { fetchUsers, deleteUserFromDatabase, updateUser } from '../backend/UserManagement';
import { Table, Button, Container, Row, Col, Form, Modal, Alert } from 'react-bootstrap';
import { getAuth, deleteUser } from 'firebase/auth';

const UserManagement = () => {
  const [users, setUsers] = useState({});
  const [filteredUsers, setFilteredUsers] = useState({});
  const [filterRole, setFilterRole] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');

  useEffect(() => {
    const getUsers = async () => {
      const usersData = await fetchUsers();
      setUsers(usersData);
      setFilteredUsers(usersData);
    };
    getUsers();
  }, []);

  const handleDelete = async (email, role) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      setAlertMessage('Error deleting user: User is not authenticated.');
      setAlertVariant('danger');
      setShowAlert(true);
      return;
    }

    try {
      await deleteUser(user);
      await deleteUserFromDatabase(email, role);
      const updatedUsers = { ...users };
      delete updatedUsers[email.replace('.', ',')];
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      setShowConfirmModal(false);
      setAlertMessage('User deleted successfully');
      setAlertVariant('success');
      setShowAlert(true);
    } catch (error) {
      console.error('Error deleting user:', error);
      setAlertMessage('Error deleting user: ' + error.message);
      setAlertVariant('danger');
      setShowAlert(true);
    }

    setTimeout(() => {
      setAlertMessage('');
      setShowAlert(false);
    }, 5000);
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setShowModal(true);
  };

  const handleFilterChange = (e) => {
    const role = e.target.value;
    setFilterRole(role);
    if (role === '') {
      setFilteredUsers(users);
    } else {
      const filtered = Object.keys(users)
        .filter((key) => users[key].role === role)
        .reduce((obj, key) => {
          obj[key] = users[key];
          return obj;
        }, {});
      setFilteredUsers(filtered);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setCurrentUser(null);
  };

  const handleModalSave = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      setAlertMessage('Error updating user: User is not authenticated.');
      setAlertVariant('danger');
      setShowAlert(true);
      return;
    }

    const role = currentUser.role;
    const updatedData = { ...currentUser };

    if (role === 'Club Manager' || role === 'Security Admin') {
      updatedData.fullName = currentUser.fullName;
      updatedData.contactNumber = currentUser.contactNumber;
    } else if (role === 'Security Personnel') {
      updatedData.fullName = currentUser.fullName;
      updatedData.rate = currentUser.rate;
      updatedData.contactNumber = currentUser.contactNumber;
      updatedData.bankDetails = currentUser.bankDetails;
      updatedData.gender = currentUser.gender;
      updatedData.personnelType = currentUser.personnelType;
    }

    await updateUser(currentUser.email, updatedData, role);
    const updatedUsers = { ...users, [currentUser.email.replace('.', ',')]: updatedData };
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setAlertMessage('User updated successfully');
    setAlertVariant('success');
    setShowAlert(true);
    handleModalClose();
    setCurrentUser(null);

    setTimeout(() => {
      setAlertMessage('');
      setShowAlert(false);
    }, 5000);
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const handleShowConfirmModal = (user) => {
    setUserToDelete(user);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    handleDelete(userToDelete.email, userToDelete.role);
  };

  const handleConfirmModalClose = () => {
    setShowConfirmModal(false);
    setUserToDelete(null);
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={15}>
          <h1 className="mt-4">User List</h1>
          {showAlert && <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>{alertMessage}</Alert>}
          <Form.Group controlId="filterRole" className="mt-3">
            <Form.Label>Filter by Role</Form.Label>
            <Form.Control as="select" value={filterRole} onChange={handleFilterChange}>
              <option value="">All Roles</option>
              <option value="Club Manager">Club Manager</option>
              <option value="Security Admin">Security Admin</option>
              <option value="Security Personnel">Security Personnel</option>
            </Form.Control>
          </Form.Group>
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Contact Number</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(filteredUsers).map((key) => (
                <tr key={key}>
                  <td>{filteredUsers[key].fullName}</td>
                  <td>{filteredUsers[key].contactNumber}</td>
                  <td>{filteredUsers[key].email}</td>
                  <td>{filteredUsers[key].role}</td>
                  <td>
                    <Button variant="primary" onClick={() => handleEdit(filteredUsers[key])} className="mr-5">
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => handleShowConfirmModal(filteredUsers[key])}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentUser && (
            <Form>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={currentUser.email}
                  onChange={handleModalChange}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="formRole" className="mt-3">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  type="text"
                  name="role"
                  value={currentUser.role}
                  readOnly
                />
              </Form.Group>
              {currentUser.role === 'Club Manager' || currentUser.role === 'Security Admin' ? (
                <>
                  <Form.Group controlId="formFullName" className="mt-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="fullName"
                      value={currentUser.fullName || ''}
                      onChange={handleModalChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formContactNumber" className="mt-3">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="contactNumber"
                      value={currentUser.contactNumber || ''}
                      onChange={handleModalChange}
                    />
                  </Form.Group>
                </>
              ) : currentUser.role === 'Security Personnel' ? (
                <>
                  <Form.Group controlId="formFullName" className="mt-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="fullName"
                      value={currentUser.fullName || ''}
                      onChange={handleModalChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formRate" className="mt-3">
                    <Form.Label>Rate</Form.Label>
                    <Form.Control
                      type="text"
                      name="rate"
                      value={currentUser.rate || ''}
                      onChange={handleModalChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formContactNumber" className="mt-3">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="contactNumber"
                      value={currentUser.contactNumber || ''}
                      onChange={handleModalChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBankDetails" className="mt-3">
                    <Form.Label>Bank Details</Form.Label>
                    <Form.Control
                      type="text"
                      name="bankDetails"
                      value={currentUser.bankDetails || ''}
                      onChange={handleModalChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formGender" className="mt-3">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control
                      type="text"
                      name="gender"
                      value={currentUser.gender || ''}
                      onChange={handleModalChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formPersonnelType" className="mt-3">
                    <Form.Label>Personnel Type</Form.Label>
                    <Form.Control
                      type="text"
                      name="personnelType"
                      value={currentUser.personnelType || ''}
                      onChange={handleModalChange}
                    />
                  </Form.Group>
                </>
              ) : null}
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleModalSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showConfirmModal} onHide={handleConfirmModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this user?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleConfirmModalClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserManagement;