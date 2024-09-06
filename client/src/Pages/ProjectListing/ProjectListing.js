import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProjectListing.css';
import logo from '../../assets/Logo.svg';
import Sidebar from '../../components/Sidebar/Sidebar';

const ProjectListing = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/projects?page=${currentPage}`);
        const projectsArray = Object.values(response.data.projects || {});
        setProjects(projectsArray);
        setTotalPages(response.data.totalPages || 1);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects([]); // Set to empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const updateStatus = async (projectId, status) => {
    try {
      const response = await axios.put(`/api/projects/${projectId}/status`, { status });
      console.log(`Status updated: ${response.data.message}`);
    } catch (error) {
      console.error(`Error updating status for project ID ${projectId}:`, error);
    }
  };

  return (
    <div className="project-listing">
      <Sidebar />
      <div className="logo-container">
        <h2>Project Listing</h2>
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="list-container">
        <div className="controls">
          <input className='search' type="text" placeholder="Search projects..." />
          <div className="sort-container">
            <label htmlFor="sort-select">Sort by:</label>
            <select id="sort-select">
              <option value="date">Date</option>
              <option value="priority">Priority</option>
            </select>
          </div>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {/* Desktop View (Table) */}
            <div className="desktop-view">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Project Theme</th>
                    <th>Reason</th>
                    <th>Type</th>
                    <th>Division</th>
                    <th>Category</th>
                    <th>Priority</th>
                    <th>Department</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.length > 0 ? (
                    projects.map((project) => (
                      <tr key={project.id}>
                        <td>{project.id}</td>
                        <td>
                          <div>{project.projectTheme || 'N/A'}</div>
                          <div>
                            {project.startDate
                              ? `${new Date(project.startDate).toLocaleDateString()}`
                              : 'Start Date: N/A'} to{' '}
                            {project.endDate
                              ? `${new Date(project.endDate).toLocaleDateString()}`
                              : 'End Date: N/A'}
                          </div>
                        </td>
                        <td>{project.reason}</td>
                        <td>{project.projectType}</td>
                        <td>{project.division}</td>
                        <td>{project.category}</td>
                        <td>{project.priority}</td>
                        <td>{project.department}</td>
                        <td>{project.location}</td>
                        <td>{project.status}</td>
                        <td>
                          <button className="list-btn" onClick={() => updateStatus(project.id, 'Running')}>Start</button>
                          <button className="list-btn" onClick={() => updateStatus(project.id, 'Closed')}>Close</button>
                          <button className="list-btn" onClick={() => updateStatus(project.id, 'Cancelled')}>Cancel</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="11">No projects found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile View (List) */}
            <div className="mobile-view">
              {projects.length > 0 ? (
                projects.map((project) => (
                  <div key={project.id} className="project-item">
                    <div><strong>Project ID:</strong> {project.id}</div>
                    <div><strong>Theme:</strong> {project.projectTheme || 'N/A'}</div>
                    <div><strong>Reason:</strong> {project.reason}</div>
                    <div><strong>Type:</strong> {project.projectType}</div>
                    <div><strong>Division:</strong> {project.division}</div>
                    <div><strong>Category:</strong> {project.category}</div>
                    <div><strong>Priority:</strong> {project.priority}</div>
                    <div><strong>Department:</strong> {project.department}</div>
                    <div><strong>Location:</strong> {project.location}</div>
                    <div><strong>Status:</strong> {project.status}</div>
                    <div><strong>Date:</strong> {project.startDate ? `${new Date(project.startDate).toLocaleDateString()}` : 'Start Date: N/A'} to {project.endDate ? `${new Date(project.endDate).toLocaleDateString()}` : 'End Date: N/A'}</div>
                    <button className="list-btn" onClick={() => updateStatus(project.id, 'Running')}>Start</button>
                    <button className="list-btn" onClick={() => updateStatus(project.id, 'Closed')}>Close</button>
                    <button className="list-btn" onClick={() => updateStatus(project.id, 'Cancelled')}>Cancel</button>
                  </div>
                ))
              ) : (
                <p>No projects available.</p>
              )}
            </div>
     
            <div className="pagination">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  className={currentPage === index + 1 ? 'active' : ''}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectListing;
