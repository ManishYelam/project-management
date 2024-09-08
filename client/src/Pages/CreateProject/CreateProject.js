import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import './CreateProject.css';
import logo from '../../assets/Logo.svg';
import axios from 'axios';
import { Navbar, Nav, Button, Collapse } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../../components/Sidebar/Sidebar';

// Project options
const projectTypes = [
  { value: 'web', label: 'Web Development' },
  { value: 'mobile', label: 'Mobile Development' },
  { value: 'data', label: 'Data Science' },
];

const divisions = [
  { value: 'division1', label: 'Division 1' },
  { value: 'division2', label: 'Division 2' },
];

const categories = [
  { value: 'category1', label: 'Category 1' },
  { value: 'category2', label: 'Category 2' },
];

const priorities = [
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];

const departments = [
  { value: 'department1', label: 'Department 1' },
  { value: 'department2', label: 'Department 2' },
];

const CreateProject = () => {
  const [projectTheme, setProjectTheme] = useState('');
  const [reason, setReason] = useState('');
  const [projectType, setProjectType] = useState(null);
  const [division, setDivision] = useState(null);
  const [category, setCategory] = useState(null);
  const [priority, setPriority] = useState(null);
  const [department, setDepartment] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('Pending');
  const [open, setOpen] = useState(false); // Navbar toggle state

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProject = {
      projectTheme,
      reason,
      projectType: projectType?.value,
      division: division?.value,
      category: category?.value,
      priority: priority?.value,
      department: department?.value,
      startDate: startDate ? startDate.toISOString().split('T')[0] : null,
      endDate: endDate ? endDate.toISOString().split('T')[0] : null,
      location,
      status: 'Registered',
    };

    try {
      const response = await axios.post('http://localhost:5000/api/project', newProject);
      console.log(response.data);
      alert('Project created successfully!');
      setStatus('Registered');
    } catch (error) {
      console.error('Error creating project:', error.response?.data || error.message);
      alert('Failed to create project');
      setStatus('Try again...');
    }
  };

  return (
    <>
      <div className="container-fluid">
        <Sidebar />
        <div className="row">
          {/* Create Project Form */}
          <div className="col-md-12">
            <div className="create-project">
              <div className="logo-container d-flex text-center mb-4 px-4 py-2">
                <img src={logo} alt="Logo" className="logo" />
              </div>
              <div className="container-fluid bg-white p-4 rounded-4">
                <form onSubmit={handleSubmit} className="form-horizontal">
                  <div className="row">
                    <div className="col-md-6 mb-5">
                      <input
                        type="text"
                        id="projectTheme"
                        value={projectTheme}
                        onChange={(e) => setProjectTheme(e.target.value)}
                        placeholder="Enter Project Theme"
                        className="form-control"
                        required
                      />
                    </div>

                    <div className="col-6 mb-5 text-end">
                      <button className="btn btn-primary rounded-pill" type="submit">
                        Save Project
                      </button>
                    </div>

                    <div className="col-md-3 mb-3">
                      <label htmlFor="projectType">Reason for Project</label>
                      <input
                        type="text"
                        id="reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Reason for Project"
                        className="form-control"
                        required
                      />
                    </div>

                    <div className="col-md-3 mb-3">
                      <label htmlFor="projectType">Type</label>
                      <Select
                        id="projectType"
                        options={projectTypes}
                        value={projectType}
                        onChange={setProjectType}
                        placeholder="Select project type"
                        required
                      />
                    </div>

                    <div className="col-md-3 mb-3">
                      <label htmlFor="division">Division</label>
                      <Select
                        id="division"
                        options={divisions}
                        value={division}
                        onChange={setDivision}
                        placeholder="Select division"
                        required
                      />
                    </div>

                    <div className="col-md-3 mb-3">
                      <label htmlFor="category">Category</label>
                      <Select
                        id="category"
                        options={categories}
                        value={category}
                        onChange={setCategory}
                        placeholder="Select category"
                        required
                      />
                    </div>

                    <div className="col-md-3 mb-3">
                      <label htmlFor="priority">Priority</label>
                      <Select
                        id="priority"
                        options={priorities}
                        value={priority}
                        onChange={setPriority}
                        placeholder="Select priority"
                        required
                      />
                    </div>

                    <div className="col-md-3 mb-3">
                      <label htmlFor="department">Department</label>
                      <Select
                        id="department"
                        options={departments}
                        value={department}
                        onChange={setDepartment}
                        placeholder="Select department"
                        required
                      />
                    </div>

                    <div className="col-md-3 mb-3">
                      <label htmlFor="startDate">Start Date</label>
                      <DatePicker
                        id="startDate"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="yyyy/MM/dd"
                        placeholderText="Select start date"
                        className="form-control"
                        required
                      />
                    </div>

                    <div className="col-md-3 mb-3">
                      <label htmlFor="endDate">End Date</label>
                      <DatePicker
                        id="endDate"
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        dateFormat="yyyy/MM/dd"
                        placeholderText="Select end date"
                        className="form-control"
                        required
                      />
                    </div>

                    <div className="col-md-4 mb-3">
                      <label htmlFor="location">Location</label>
                      <input
                        type="text"
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Enter location"
                        className="form-control"
                        required
                      />
                    </div>

                    <div className="col-md-12 mt-3">
                      <p>Status: {status}</p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProject;
