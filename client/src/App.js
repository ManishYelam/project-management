import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage/LoginPage';
import Dashboard from './Pages/DashBoard/DashBoard';
import ProjectListing from './Pages/ProjectListing/ProjectListing';
import CreateProject from './Pages/CreateProject/CreateProject';
// import ForgotPassword from './components/ForgotPassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<ProjectListing />} />
        <Route path="/add-project" element={<CreateProject />} />
        {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
