import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import './CreateProject.css';
import logo from '../../assets/Logo.svg';
import Sidebar from '../../components/Sidebar/Sidebar';
import axios from 'axios';

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
      startDate: startDate ? startDate.toISOString().split('T')[0] : null, // Format as YYYY-MM-DD
      endDate: endDate ? endDate.toISOString().split('T')[0] : null,      // Format as YYYY-MM-DD
      location,
      status: "Registered",
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
      <Sidebar />
      <div className="create-project">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-grid-projecttheme form-group">
              <input
                type="text"
                id="projectTheme"
                value={projectTheme}
                onChange={(e) => setProjectTheme(e.target.value)}
                placeholder="Enter Project Theme"
                className="form-grid-projecttheme"
                required
              />
            </div>
            <div className="form-grid-reason form-group">
              <label htmlFor="reason">Reason</label>
              <input
                type="text"
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              />
            </div>
            <div className="form-grid-type form-group">
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
            <div className="form-grid-division form-group">
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
            <div className="form-grid-category form-group">
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
            <div className="form-grid-priority form-group">
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
            <div className="form-grid-department form-group">
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
            <div className="form-grid-startdate form-group">
              <label htmlFor="startDate">Start Date as per Project Plan</label>
              <DatePicker
                id="startDate"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="yyyy/MM/dd"
                placeholderText="Select start date"
                required
              />
            </div>
            <div className="form-grid-enddate form-group">
              <label htmlFor="endDate">End Date as per Project Plan</label>
              <DatePicker
                id="endDate"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="yyyy/MM/dd"
                placeholderText="Select end date"
                required
              />
            </div>
            <div className="form-grid-location form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            <div className="grid-btn">
              <button className="dash-btn" type="submit">
                Save Project
              </button>
            </div>
            <div className="form-group grid-status">
              <label>Status: {status}</label>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateProject;
