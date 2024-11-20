import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AddUser from './components/addUser';
import NavBar from './components/navBar';
import UserList from './components/UserList';
import AddClub from './components/addClub';
import ClubsList from './components/clubsList';
import HomePage from './components/home';
import Login from './components/login';
import ProtectedRoute from './backend/protectedRoute';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');

  const handleLoginSuccess = (role) => {
    setIsAuthenticated(true); // Set user as authenticated
    setUserRole(role); // Update user role
  };

  const handleLogout = () => {
    setIsAuthenticated(false); // Reset authentication state
    setUserRole(''); // Clear user role
  };

  return (
    <Router>
      <div className="App"
      style={{
        backgroundColor: '#bfbfbf', // Set background color for the entire app
        minHeight: '100vh',
      }}
      >
        <NavBar
          isAuthenticated={isAuthenticated}
          userRole={userRole}
          onLogout={handleLogout}
        />
        <Routes>
          <Route path="/Home" element={<HomePage />} />
          <Route
            path="/Login"
            element={<Login onLoginSuccess={handleLoginSuccess} />}
          />
          <Route
            path="/AddUser"
            element={
              <ProtectedRoute
                element={<AddUser />}
                isAuthenticated={isAuthenticated}
                userRole={userRole}
                allowedRole="securityAdmin"
              />
            }
          />
          <Route
            path="/UserList"
            element={
              <ProtectedRoute
                element={<UserList />}
                isAuthenticated={isAuthenticated}
                userRole={userRole}
                allowedRole="securityAdmin"
              />
            }
          />
          <Route
            path="/AddClub"
            element={
              <ProtectedRoute
                element={<AddClub />}
                isAuthenticated={isAuthenticated}
                userRole={userRole}
                allowedRole="securityAdmin"
              />
            }
          />
          <Route
            path="/ClubsList"
            element={
              <ProtectedRoute
                element={<ClubsList />}
                isAuthenticated={isAuthenticated}
                userRole={userRole}
                allowedRole="securityAdmin"
              />
            }
          />
          <Route path="*" element={<Navigate to="/Home" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
