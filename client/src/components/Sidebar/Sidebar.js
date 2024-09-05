import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

// Import the SVG icons
import dashboardIcon from '../../assets/Dashboard.svg';
import dashboardIconActive from '../../assets/Dashboard-active.svg';
import projectListIcon from '../../assets/Project-list.svg';
import projectListIconActive from '../../assets/Project-list-active.svg';
import createProjectIcon from '../../assets/create-project.svg';
import createProjectIconActive from '../../assets/create-project-active.svg';
import logoutIcon from '../../assets/Logout.svg';
// import logoutIconActive from '../../assets/logout.svg';

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <li>
          <Link to="/dashboard">
            <img
              src={location.pathname === '/dashboard' ? dashboardIconActive : dashboardIcon}
              alt="Dashboard"
              className="menu-icon"
            />
          </Link>
        </li>
        <li>
          <Link to="/projects">
            <img
              src={location.pathname === '/projects' ? projectListIconActive : projectListIcon}
              alt="Project Listing"
              className="menu-icon"
            />
          </Link>
        </li>
        <li>
          <Link to="/add-project">
            <img
              src={location.pathname === '/add-project' ? createProjectIconActive : createProjectIcon}
              alt="Add Project"
              className="menu-icon"
            />
          </Link>
        </li>
        <li>
          <Link to="/">
            <img
              src={logoutIcon}
              alt="Logout"
              className="menu-icon"
            />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
