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
    <>
      
      <div className="project-listing">
      <Sidebar />
        <div className="logo-container">
          <h2> ProjectListing</h2>
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
          )}

          <div className="pagination">
            {[...Array(totalPages).keys()].map((page) => (
              <button
                key={page + 1}
                onClick={() => handlePageChange(page + 1)}
                className={currentPage === page + 1 ? 'active' : ''}
              >
                {page + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectListing;
