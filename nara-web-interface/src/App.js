import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import AddUser from './components/addUser'
import NavBar from './components/navBar'
import UserList from './components/UserList'
import AddClub from './components/addClub'
import ClubsList from './components/clubsList'
import HomePage from './components/home'
import Login from './components/login'

const App = () => {
  return (
    <Router>
      <div className='App'>
        <NavBar />
        <Routes>
          <Route path="/Home" element={<HomePage />} />
          <Route path="/AddUser" element={<AddUser />} />
          <Route path="/UserList" element={<UserList />} />
          <Route path="/AddClub" element={<AddClub />} />
          <Route path="/ClubsList" element={<ClubsList />} />
          <Route path="/Login" element={<Login />} />
          <Route path="*" element={<Navigate to="/Home" />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App