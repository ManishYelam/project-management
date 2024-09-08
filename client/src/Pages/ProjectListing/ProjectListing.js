import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProjectListing.css'; // Assuming this file contains the CSS styling
import Sidebar from '../../components/Sidebar/Sidebar'; // Adjust path based on your structure
import { Pagination, Spinner, Form, Button, Table, Container, Row, Col } from 'react-bootstrap';
import logo from "../../assets/Logo.svg"; // Adjust path to your logo file

const ProjectListing = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('date');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Initialize based on screen width

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/projects`, {
          params: { page: currentPage, search, sort }
        });
        const projectsArray = Object.values(response.data.projects || {});
        setProjects(projectsArray);
        setTotalPages(response.data.totalPages || 1);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [currentPage, search, sort]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    <Container fluid className="project-listing">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      <Row>
        {/* Sidebar */}
        {!isMobile && (
          <Col md={3} className="sidebar-container">
            <Sidebar />
          </Col>
        )}

        {/* Main Content */}
        <Col md={isMobile ? 12 : 9} className="content-container container-fluid">
          {/* Search and Sort Controls */}
          <div className="list-controls">
            <Form.Control
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mb-3"
            />
            <Form.Group>
              <Form.Label>Sort by:</Form.Label>
              <Form.Control
                as="select"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="mb-3"
              >
                <option value="date">Date</option>
                <option value="priority">Priority</option>
              </Form.Control>
            </Form.Group>
          </div>

          {/* Content - Loading Spinner */}
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" />
            </div>
          ) : (
            <>
              {/* Desktop View (Table) */}
              {!isMobile && (
                <div className="desktop-view container-fluid">
                  <Table striped bordered hover responsive>
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
                              <Button className='btn-custom rounded-pill' onClick={() => updateStatus(project.id, 'Running')}>Start</Button>
                              <Button className='btn-custom rounded-pill' onClick={() => updateStatus(project.id, 'Closed')}>Close</Button>
                              <Button className='btn-custom rounded-pill' onClick={() => updateStatus(project.id, 'Cancelled')}>Cancel</Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="11">No projects found</td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
              )}

              {/* Mobile View */}
              {isMobile && (
                <div className="mobile-view">
                  {projects.length > 0 ? (
                    projects.map((project) => (
                      <div className="project-item p-4 mb-3 rounded-sm" key={project.id}>
                        <div className="field-label">ID:</div>
                        <div>{project.id}</div>
                        <div className="field-label">Project Theme:</div>
                        <div>{project.projectTheme || 'N/A'}</div>
                        <div className="field-label">Dates:</div>
                        <div>
                          {project.startDate
                            ? `${new Date(project.startDate).toLocaleDateString()}`
                            : 'Start Date: N/A'} to{' '}
                          {project.endDate
                            ? `${new Date(project.endDate).toLocaleDateString()}`
                            : 'End Date: N/A'}
                        </div>
                        <div className="field-label">Reason:</div>
                        <div>{project.reason}</div>
                        <div className="field-label">Type:</div>
                        <div>{project.projectType}</div>
                        <div className="field-label">Division:</div>
                        <div>{project.division}</div>
                        <div className="field-label">Category:</div>
                        <div>{project.category}</div>
                        <div className="field-label">Priority:</div>
                        <div>{project.priority}</div>
                        <div className="field-label">Department:</div>
                        <div>{project.department}</div>
                        <div className="field-label">Location:</div>
                        <div>{project.location}</div>
                        <div className="field-label">Status:</div>
                        <div>{project.status}</div>
                        <div className="field-label">Actions:</div>
                        <div>
                          <Button className='btn-custom rounded-pill' onClick={() => updateStatus(project.id, 'Running')}>Start</Button>
                          <Button className='btn-custom rounded-pill' onClick={() => updateStatus(project.id, 'Closed')}>Close</Button>
                          <Button className='btn-custom rounded-pill' onClick={() => updateStatus(project.id, 'Cancelled')}>Cancel</Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div>No projects found</div>
                  )}
                </div>
              )}

              {/* Pagination */}
              <div className="pagination">
                <Pagination>
                  <Pagination.First onClick={() => handlePageChange(1)} />
                  <Pagination.Prev onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)} />
                  {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item
                      key={index + 1}
                      active={currentPage === index + 1}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)} />
                  <Pagination.Last onClick={() => handlePageChange(totalPages)} />
                </Pagination>
              </div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProjectListing;
