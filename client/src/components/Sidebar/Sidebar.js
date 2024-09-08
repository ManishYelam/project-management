import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sidebar.css'; // Ensure this contains additional custom styles if needed

import dashboardIcon from '../../assets/Dashboard.svg';
import dashboardIconActive from '../../assets/Dashboard-active.svg';
import projectListIcon from '../../assets/Project-list.svg';
import projectListIconActive from '../../assets/Project-list-active.svg';
import createProjectIcon from '../../assets/create-project.svg';
import createProjectIconActive from '../../assets/create-project-active.svg';
import logoutIcon from '../../assets/Logout.svg';

const Sidebar = () => {
  const location = useLocation();

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="sidebar bg-light d-md-flex ">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link">
              <img
                src={location.pathname === '/dashboard' ? dashboardIconActive : dashboardIcon}
                alt="Dashboard"
                className="menu-icon"
              />
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/projects" className="nav-link">
              <img
                src={location.pathname === '/projects' ? projectListIconActive : projectListIcon}
                alt="Project Listing"
                className="menu-icon"
              />
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/add-project" className="nav-link">
              <img
                src={location.pathname === '/add-project' ? createProjectIconActive : createProjectIcon}
                alt="Add Project"
                className="menu-icon"
              />
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              <img
                src={logoutIcon}
                alt="Logout"
                className="menu-icon"
              />
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Navbar */}
      <nav className="navbar navbar-light fixed-bottom d-md-none">
        <ul className="navbar-nav flex-row w-100">
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link">
              <img
                src={location.pathname === '/dashboard' ? dashboardIconActive : dashboardIcon}
                alt="Dashboard"
                className="menu-icon"
              />
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/projects" className="nav-link">
              <img
                src={location.pathname === '/projects' ? projectListIconActive : projectListIcon}
                alt="Project Listing"
                className="menu-icon"
              />
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/add-project" className="nav-link">
              <img
                src={location.pathname === '/add-project' ? createProjectIconActive : createProjectIcon}
                alt="Add Project"
                className="menu-icon"
              />
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              <img
                src={logoutIcon}
                alt="Logout"
                className="menu-icon"
              />
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
