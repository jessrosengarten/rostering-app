import React, { useState, useEffect } from 'react';
import { fetchClubs, deleteClubsFromDatabase, updateClub, fetchManagers } from '../backend/ClubManagement';
import { Table, Button, Container, Row, Col, Form, Modal, Alert } from 'react-bootstrap';

const ClubsList = () => {
  const [clubs, setClubs] = useState({});
  const [filteredClubs, setFilteredClubs] = useState({});
  const [filterClubManager, setFilterClubManager] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentClub, setCurrentClub] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [clubToDelete, setClubToDelete] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    const getClubs = async () => {
      const clubsData = await fetchClubs();
      setClubs(clubsData);
      setFilteredClubs(clubsData);
    };
    getClubs();

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

  const handleFilterChange = (e) => {
    const manager = e.target.value;
    setFilterClubManager(manager);
    if (manager === '') {
      setFilteredClubs(clubs);
    } else {
      const filtered = Object.keys(clubs)
        .filter((key) => clubs[key].manager === manager)
        .reduce((obj, key) => {
          obj[key] = clubs[key];
          return obj;
        }, {});
      setFilteredClubs(filtered);
    }
  };

// deleting club
  const handleDelete = async (clubName) => {
    try {
      await deleteClubsFromDatabase(clubName);
      const updatedClubs = { ...clubs };
      delete updatedClubs[clubName];
      setClubs(updatedClubs);
      setFilteredClubs(updatedClubs);
      setShowConfirmModal(false);
      setAlertMessage('Club deleted successfully');
      setAlertVariant('success');
      setShowAlert(true);
    } catch (error) {
      console.error('Error deleting club:', error);
      setAlertMessage('Error deleting club: ' + error.message);
      setAlertVariant('danger');
      setShowAlert(true);
    }
  };

  const handleShowConfirmModal = (club) => {
    setClubToDelete(club);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    handleDelete(clubToDelete);
  };

  const handleConfirmModalClose = () => {
    setShowConfirmModal(false);
    setClubToDelete(null);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setCurrentClub(null);
  };

// editing club
  const handleSelectEdit = (clubKey)=>{
    const selectedClub = clubs[clubKey]; // Get the full club object
  setCurrentClub({ clubName: clubKey, ...selectedClub }); // Set the full club data in state
  setShowModal(true);
  };

  const handleEdit = async (club) => {
  try {
    await updateClub(currentClub.clubName, currentClub.address ,currentClub.contactNum, currentClub.openingTime, currentClub.closingTime, currentClub.manager, currentClub.rate);
    const updatedClubs = { ...clubs};
    setClubs(updatedClubs);
    setFilteredClubs(updatedClubs);
    setAlertMessage('Club edited successfully');
    setAlertVariant('success');
    setShowAlert(true);
  } catch (error) {
    console.error('Error editing club:', error);
    setAlertMessage('Error editing club: ' + error.message);
    setAlertVariant('danger');
    setShowAlert(true);
  }
};

  const handleModalSave = (club) => {
    setCurrentClub(club)
    handleEdit(club);
   setShowModal(false);
};

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={15}>
          <h1 className="mt-4">Club List</h1>
          {showAlert && <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>{alertMessage}</Alert>}
          <Form.Group controlId="filterManager" className="mt-3">
            <Form.Label>Filter by Club Manager</Form.Label>
            <Form.Control as="select" value={filterClubManager} onChange={handleFilterChange}>
              <option value="">Select a Manager</option>
                        {managers.map((manager, index) => (
                            <option key={index} value={manager}>
                            {manager}
                            </option>
                            ))}
            </Form.Control>
          </Form.Group>
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>Club Name</th>
                <th>Address</th>
                <th>Contact Number</th>
                <th>Opening Time</th>
                <th>Closing Time</th>
                <th>Manager</th>
                <th>Rate Per Security Personnel (Rands)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(filteredClubs).map((key) => (
                <tr key={key}>
                  <td>{key}</td> 
                  <td>{filteredClubs[key].address}</td>
                  <td>{filteredClubs[key].contactNum}</td>
                  <td>{filteredClubs[key].openingTime}</td>
                  <td>{filteredClubs[key].closingTime}</td>
                  <td>{filteredClubs[key].manager}</td>
                  <td>{filteredClubs[key].rate}</td>
                  <td>
                    <Button variant="primary" onClick={() => handleSelectEdit(key)} className="mr-5">
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => handleShowConfirmModal(key)}>
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
          <Modal.Title>Edit Club</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentClub && (
            <Form>
              <Form.Group controlId="formClubName">
                <Form.Label>Club Name</Form.Label>
                <Form.Control
                  type="text"
                  name="clubName"
                  value={currentClub.clubName}
                  disabled
                />
              </Form.Group>
              <Form.Group controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={currentClub.address}
                  onChange={(e) => setCurrentClub({ ...currentClub, address: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formContactNumber" className="mt-3">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="text"
                  name="contactNum"
                  value={currentClub.contactNum}
                  onChange={(e) => setCurrentClub({ ...currentClub, contactNum: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formOpeningTime" className="mt-3">
                <Form.Label>Opening Time</Form.Label>
                <Form.Control
                  type="time"
                  name="openingTime"
                  value={currentClub.openingTime}
                  onChange={(e) => setCurrentClub({ ...currentClub, openingTime: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formClosingTime" className="mt-3">
                <Form.Label>Closing Time</Form.Label>
                <Form.Control
                  type="time"
                  name="closingTime"
                  value={currentClub.closingTime}
                  onChange={(e) => setCurrentClub({ ...currentClub, closingTime: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formManager" className="mt-3">
                <Form.Label>Club Manager</Form.Label>
                <Form.Control
                  as="select"
                  //value={currentClub.manager}
                  onChange={(e) => setCurrentClub({ ...currentClub, manager: e.target.value })}
                  required>
                    <option value="manager">{currentClub.manager}</option>
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
                  value={currentClub.rate}
                  onChange={(e) => setCurrentClub({ ...currentClub, rate: e.target.value })}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleModalSave(currentClub)}>
  Save Changes
</Button>

        </Modal.Footer>
      </Modal>

      <Modal show={showConfirmModal} onHide={handleConfirmModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this club?
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

export default ClubsList;
